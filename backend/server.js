// server.js
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import initializeDatabase from './initDatabase.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Rate limiting middleware
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // limit each IP to 5 requests per windowMs for auth routes
});

let db;

// Initialize SQLite database
initializeDatabase().then(database => {
    db = database;
}).catch(console.error);

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({error: 'Access token required'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({error: 'Invalid or expired token'});
        }
        req.user = user;
        next();
    });
};

// Validation middleware
const validateRegistration = [
    body('email').isEmail().normalizeEmail(),
    body('password')
        .isLength({min: 8})
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
        .withMessage('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'),
    body('type').optional().isIn(['free', 'premium'])
];

const validateLogin = [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
];

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

// Registration endpoint with validation
app.post('/api/register', authLimiter, validateRegistration, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password, type = 'free'} = req.body;

        // Check for existing user
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
        if (existingUser) {
            return res.status(400).json({error: 'Email already registered'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert new user with additional fields
        const result = await db.run(
            `INSERT INTO users (
                email, 
                password, 
                type, 
                created_at, 
                last_login,
                subscription_status
            ) VALUES (?, ?, ?, datetime('now'), datetime('now'), ?)`,
            [email, hashedPassword, type, 'active']
        );

        const token = jwt.sign(
            {userId: result.lastID, email, type},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: result.lastID,
                email,
                type
            }
        });
    } catch (error) {
        next(error);
    }
});

// Login endpoint with rate limiting
app.post('/api/login', authLimiter, validateLogin, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;
        const user = await db.get('SELECT * FROM users WHERE email = ?', email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        // Update last login timestamp
        await db.run(
            'UPDATE users SET last_login = datetime("now") WHERE id = ?',
            user.id
        );

        const token = jwt.sign(
            {userId: user.id, email: user.email, type: user.type},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                type: user.type,
                subscription_status: user.subscription_status
            }
        });
    } catch (error) {
        next(error);
    }
});

// Protected profile endpoint
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await db.get(
            `SELECT id, email, type, created_at, last_login, subscription_status 
             FROM users WHERE id = ?`,
            req.user.userId
        );

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
});

// Password reset request
app.post('/api/reset-password-request', authLimiter, async (req, res) => {
    try {
        const {email} = req.body;
        const user = await db.get('SELECT * FROM users WHERE email = ?', email);

        if (!user) {
            // Return success even if user doesn't exist (security best practice)
            return res.json({message: 'If an account exists, a reset email will be sent.'});
        }

        const resetToken = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        // Store reset token in database
        await db.run(
            'UPDATE users SET reset_token = ?, reset_token_expires = datetime("now", "+1 hour") WHERE id = ?',
            [resetToken, user.id]
        );

        // Send reset email logic here (using your existing Mailgun setup)

        res.json({message: 'If an account exists, a reset email will be sent.'});
    } catch (error) {
        next(error);
    }
});

// Apply error handling middleware
app.use(errorHandler);

// Keep your existing Euribor rates endpoint and other functionality...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
