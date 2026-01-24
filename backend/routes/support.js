const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { sendSupportEmail } = require('../services/emailService');

// Validation rules for support form
const supportValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 255 }).withMessage('Name must be between 2 and 255 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 1, max: 255 }).withMessage('Subject must be between 1 and 255 characters'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 3, max: 5000 }).withMessage('Message must be between 3 and 5000 characters')
];

const rateLimit = require('express-rate-limit');

// Rate limiter: 3 requests per 15 minutes
const supportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/support/contact
router.post('/contact', supportLimiter, supportValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation Errors:', JSON.stringify(errors.array(), null, 2));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Send support email
    const emailResult = await sendSupportEmail({ name, email, subject, message });

    if (emailResult.success) {
      console.log(`✅ Support email sent from ${email}`);
      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon.'
      });
    } else {
      console.error(`❌ Support email failed for ${email}:`, emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again later or contact us directly at support@codecombat.live'
      });
    }

  } catch (error) {
    console.error('Support contact error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
});

module.exports = router;
