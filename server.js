import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import axios from 'axios';
import * as cheerio from 'cheerio';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

let db;

// Initialize SQLite database
async function initializeDatabase() {
    const dbPath = path.join(__dirname, 'database.sqlite');
    console.log('Database path:', dbPath);

    // Check if the database file exists
    try {
        await fs.access(dbPath);
        console.log('Database file exists');
    } catch (error) {
        console.log('Database file does not exist, creating a new one');
        await fs.writeFile(dbPath, ''); // Create an empty file
    }

    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users
        (
            id
            INTEGER
            PRIMARY
            KEY
            AUTOINCREMENT,
            email
            TEXT
            UNIQUE,
            password
            TEXT,
            is_confirmed
            BOOLEAN
            DEFAULT
            1,
            type
            TEXT
            CHECK (
            type
            IN
        (
            'advanced',
            'premium'
        )) DEFAULT 'advanced'
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

    console.log('Database initialized successfully');
}

initializeDatabase().catch(console.error);

// Initialize Mailgun
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
});

// Function to send confirmation email (kept for future use)
async function sendConfirmationEmail(email, token) {
    const confirmationLink = `${process.env.FRONTEND_URL}/confirm-email/${token}`;

    const msg = {
        from: 'Real Estate ROI Calculator <noreply@yourdomain.com>',
        to: email,
        subject: 'Confirm Your Email',
        text: `Please confirm your email by clicking on the following link: ${confirmationLink}`,
        html: `<p>Please confirm your email by clicking on the following link: <a href="${confirmationLink}">${confirmationLink}</a></p>`
    };

    try {
        await mg.messages.create(process.env.MAILGUN_DOMAIN, msg);
        console.log('Confirmation email sent');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
}

app.post('/api/register', async (req, res) => {
    try {
        const {email, password, type} = req.body;
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
        if (existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Directly insert the user without confirmation token and set is_confirmed to 1
        const result = await db.run(
            'INSERT INTO users (email, password, is_confirmed, type) VALUES (?, ?, 1, ?)',
            email, hashedPassword, type || 'advanced'
        );
        res.status(201).json({message: 'User registered successfully. You can now log in.'});
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({error: 'Error registering user'});
    }
});

// Keep the confirm-email endpoint for future use
app.get('/api/confirm-email/:token', async (req, res) => {
    res.json({message: 'Email confirmation is currently disabled for testing purposes.'});
});

app.post('/api/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await db.get('SELECT * FROM users WHERE email = ?', email);
        if (user && await bcrypt.compare(password, user.password)) {
            // Remove the email confirmation check
            const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.json({token, user: {id: user.id, email: user.email, type: user.type}});
        } else {
            res.status(401).json({error: 'Invalid credentials'});
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({error: 'Error logging in'});
    }
});

app.get('/api/user', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({error: 'No token provided'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await db.get('SELECT id, email, type FROM users WHERE id = ?', decoded.userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({error: 'Error fetching user data'});
    }
});

app.put('/api/user/update-subscription', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({error: 'No token provided'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {subscriptionType} = req.body;

        if (!['advanced', 'premium'].includes(subscriptionType)) {
            return res.status(400).json({error: 'Invalid subscription type'});
        }

        await db.run('UPDATE users SET type = ? WHERE id = ?', subscriptionType, decoded.userId);
        res.json({message: 'Subscription updated successfully'});
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({error: 'Error updating subscription'});
    }
});

// Function to fetch Euribor rates from the website
async function fetchEuriborRatesFromWebsite() {
    const response = await axios.get('https://www.euribor-rates.eu/en/');
    const $ = cheerio.load(response.data);

    const rates = {
        euribor_1_week: 0,
        euribor_1_month: 0,
        euribor_3_months: 0,
        euribor_6_months: 0,
        euribor_12_months: 0
    };

    $('.table.table-striped tbody tr').each((i, elem) => {
        const period = $(elem).find('td:first-child a').text().trim().toLowerCase();
        const rate = parseFloat($(elem).find('td:last-child').text().trim().replace('%', ''));

        switch (period) {
            case 'euribor 1 week':
                rates.euribor_1_week = rate;
                break;
            case 'euribor 1 month':
                rates.euribor_1_month = rate;
                break;
            case 'euribor 3 months':
                rates.euribor_3_months = rate;
                break;
            case 'euribor 6 months':
                rates.euribor_6_months = rate;
                break;
            case 'euribor 12 months':
                rates.euribor_12_months = rate;
                break;
        }
    });

    return rates;
}

// New endpoint to fetch Euribor rates
app.get('/api/euribor-rates', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];

        // Check if we have rates for today
        const storedRates = await db.get('SELECT * FROM euribor_rates WHERE fetch_date = ?', today);

        if (storedRates) {
            console.log('Returning stored Euribor rates');
            return res.json({
                euribor_1_week: storedRates.euribor_1_week,
                euribor_1_month: storedRates.euribor_1_month,
                euribor_3_months: storedRates.euribor_3_months,
                euribor_6_months: storedRates.euribor_6_months,
                euribor_12_months: storedRates.euribor_12_months,
                fetch_date: storedRates.fetch_date
            });
        }

        console.log('Fetching new Euribor rates');
        const rates = await fetchEuriborRatesFromWebsite();

        // Save the new rates to the database
        await db.run(`
            INSERT INTO euribor_rates (euribor_1_week, euribor_1_month, euribor_3_months, euribor_6_months,
                                       euribor_12_months, fetch_date)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [rates.euribor_1_week, rates.euribor_1_month, rates.euribor_3_months, rates.euribor_6_months, rates.euribor_12_months, today]);

        console.log('New Euribor rates saved to database');
        res.json({...rates, fetch_date: today});
    } catch (error) {
        console.error('Error fetching or storing Euribor rates:', error);
        res.status(500).json({error: 'Error fetching or storing Euribor rates'});
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
