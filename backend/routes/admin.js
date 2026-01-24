const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/admin/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check admin in DB
        const [admins] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
        
        if (admins.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const admin = admins[0];

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate Token
        const token = jwt.sign(
            { id: admin.id, role: 'admin', email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            admin: {
                email: admin.email,
                role: 'admin'
            }
        });

        // Send Login Alert (Async - Fire and Forget)
        const emailService = require('../services/emailService');
        const loginIp = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];
        
        emailService.sendAdminLoginAlert({
            email: admin.email,
            ip: loginIp,
            userAgent: userAgent
        }).catch(err => console.error('Alert Error:', err));

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// GET /api/admin/verify - Verify Token
router.get('/verify', authMiddleware, (req, res) => {
    res.json({ success: true, valid: true });
});

// GET /api/admin/users - Get All Users
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM registrations ORDER BY created_at DESC');
        res.json({ success: true, count: users.length, users });
    } catch (error) {
        console.error('Fetch Users Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
});

// PUT /api/admin/users/:id - Update User
const { body, validationResult } = require('express-validator');

router.put('/users/:id', [
    authMiddleware,
    // Validation Rules
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phone').matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
    body('rollNumber').trim().notEmpty().withMessage('Roll Number is required'),
    body('branch').trim().notEmpty().withMessage('Branch is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg });
        }

        const { id } = req.params;
        const { name, email, phone, rollNumber, branch } = req.body;

        const [result] = await db.query(
            'UPDATE registrations SET name = ?, email = ?, phone = ?, roll_number = ?, branch = ? WHERE id = ?',
            [name, email, phone, rollNumber, branch, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User updated successfully' });

    } catch (error) {
        console.error('Update User Error:', error);
        res.status(500).json({ success: false, message: 'Failed to update user' });
    }
});

// DELETE /api/admin/users/:id - Delete User
router.delete('/users/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query('DELETE FROM registrations WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully' });

    } catch (error) {
        console.error('Delete User Error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete user' });
    }
});

module.exports = router;
