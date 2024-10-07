import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

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

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      is_confirmed BOOLEAN DEFAULT 1
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
    const { email, password } = req.body;
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Directly insert the user without confirmation token and set is_confirmed to 1
    const result = await db.run(
        'INSERT INTO users (email, password, is_confirmed) VALUES (?, ?, 1)',
        email, hashedPassword
    );
    res.status(201).json({ message: 'User registered successfully. You can now log in.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Keep the confirm-email endpoint for future use
app.get('/api/confirm-email/:token', async (req, res) => {
  res.json({ message: 'Email confirmation is currently disabled for testing purposes.' });
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.get('SELECT * FROM users WHERE email = ?', email);
    if (user && await bcrypt.compare(password, user.password)) {
      // Remove the email confirmation check
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
