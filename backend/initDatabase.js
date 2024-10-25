// initDatabase.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcryptjs';

dotenv.config({path: '.env.dev'});

async function initializeDatabase() {
    const dbPath = path.join(process.cwd(), 'backend', 'database.db');
    console.log('Database path:', dbPath);

    try {
        await fs.access(dbPath);
        console.log('Database file exists');
    } catch (error) {
        console.log('Database file does not exist, creating a new one');
        await fs.writeFile(dbPath, '');
    }

    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    // Enhanced users table with additional fields
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            type TEXT DEFAULT 'free',
            subscription_status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_login DATETIME,
            reset_token TEXT,
            reset_token_expires DATETIME,
            verification_token TEXT,
            is_verified BOOLEAN DEFAULT 0
        )
    `);

    // Keep your existing euribor_rates table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS euribor_rates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            euribor_1_week REAL,
            euribor_1_month REAL,
            euribor_3_months REAL,
            euribor_6_months REAL,
            euribor_12_months REAL,
            fetch_date TEXT
        )
    `);

    // New table for tracking user sessions
    await db.exec(`
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            expires_at DATETIME NOT NULL,
            is_valid BOOLEAN DEFAULT 1,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    `);

    // Add predefined user if specified in environment variables
    if (process.env.PREDEFINED_USER_EMAIL && process.env.PREDEFINED_USER_PASSWORD) {
        const predefinedUser = {
            email: process.env.PREDEFINED_USER_EMAIL,
            password: process.env.PREDEFINED_USER_PASSWORD,
            type: process.env.PREDEFINED_USER_TYPE || 'premium'
        };

        const row = await db.get('SELECT * FROM users WHERE email = ?', [predefinedUser.email]);
        if (!row) {
            const hashedPassword = await bcrypt.hash(predefinedUser.password, 12);
            await db.run(
                'INSERT INTO users (email, password, type, is_verified) VALUES (?, ?, ?, 1)',
                [predefinedUser.email, hashedPassword, predefinedUser.type]
            );
            console.log('Predefined user added to the database.');
        } else {
            console.log('Predefined user already exists in the database.');
        }
    }

    console.log('Database initialized successfully');
    return db;
}

export default initializeDatabase;
