import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcryptjs';

dotenv.config({path: '.env.dev'});

const predefinedUser = {
    email: process.env.PREDEFINED_USER_EMAIL,
    password: process.env.PREDEFINED_USER_PASSWORD,
    type: process.env.PREDEFINED_USER_TYPE
};

async function initializeDatabase() {
    const dbPath = path.join(process.cwd(), 'database.sqlite');
    console.log('Database path:', dbPath);

    try {
        await fs.access(dbPath);
        console.log('Database file exists');
    } catch (error) {
        console.log('Database file does not exist, creating a new one');
        await fs.writeFile(dbPath, ''); // Create an empty file
    }

    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users
        (
            email
            TEXT
            UNIQUE,
            password
            TEXT,
            type
            TEXT
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS euribor_rates
        (
            id
            INTEGER
            PRIMARY
            KEY
            AUTOINCREMENT,
            euribor_1_week
            REAL,
            euribor_1_month
            REAL,
            euribor_3_months
            REAL,
            euribor_6_months
            REAL,
            euribor_12_months
            REAL,
            fetch_date
            TEXT
        )
    `);

    const row = await db.get(`SELECT *
                              FROM users
                              WHERE email = ?`, [predefinedUser.email]);
    if (!row) {
        const hashedPassword = await bcrypt.hash(predefinedUser.password, 10);
        await db.run(`INSERT INTO users (email, password, type)
                      VALUES (?, ?, ?)`,
            predefinedUser.email, hashedPassword, predefinedUser.type);
        console.log('Predefined user added to the database.');
    } else {
        console.log('Predefined user already exists in the database.');
    }

    console.log('Database initialized successfully');
    return db;
}

export default initializeDatabase;
