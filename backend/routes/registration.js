const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const db = require('../config/database')
const { sendRegistrationEmail } = require('../services/emailService')

// Allowed Branches List
const ALLOWED_BRANCHES = [
  'Computer Science & Engineering',
  'Information Technology',
  'Computer Science & Communication Engineering',
  'Computer Science & Systems Engineering',
  'Computer Science and Engineering with specialization Artificial Intelligence and Machine Learning',
  'Computer Science and Engineering with specialization Artificial Intelligence',
  'Computer Science and Engineering with specialization Cyber Security',
  'Computer Science and Engineering with specialization Data Science',
  'Computer Science and Engineering with specialization Internet of Things and Cyber Security Including Block Chain Technology',
  'Computer Science and Engineering with specialization Internet of Things',

  'Electrical Engineering',
  'Electrical and Computer Engineering',
  'Electronics & Tele-Communication Engineering',
  'Electronics & Electrical Engineering',
  'Electronics and Computer Science Engineering',
  'Electronics Engineering VLSI Design and Technology',
  'Electronics and Instrumentation',

  'Chemical Engineering',
  'Civil Engineering',
  'Construction Technology',
  'Mechanical Engineering',
  'Mechanical Engineering(Automobile)',
  'Aerospace Engineering',
  'Mechatronics Engineering',
  'Other'
]

// Validation rules
const registrationValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),

  body('rollNumber')
    .trim()
    .notEmpty()
    .withMessage('Roll number is required')
    .matches(/^[0-9]+$/)
    .withMessage('Roll number must contain only numbers')
    .isLength({ min: 1, max: 20 })
    .withMessage('Roll number length is invalid'),

  body('branch')
    .trim()
    .notEmpty()
    .withMessage('Branch is required')
    .isIn(ALLOWED_BRANCHES)
    .withMessage('Invalid branch selected'),

  body('gender')
    .trim()
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Invalid gender selected'),

  body('year')
    .trim()
    .notEmpty()
    .withMessage('Year is required')
    .isIn([
      '1st',
      '2nd',
      '3rd',
      '4th',
      '1st Year',
      '2nd Year',
      '3rd Year',
      '4th Year'
    ])
    .withMessage('Invalid year selected')
]

// POST /api/registration/register
router.post('/register', registrationValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(
        '❌ Validation Errors:',
        JSON.stringify(errors.array(), null, 2)
      )
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { name, email, phone, rollNumber, branch, gender, year } = req.body

    // Check if email already exists
    const [existingEmail] = await db.query(
      'SELECT id FROM registrations WHERE email = ?',
      [email]
    )

    if (existingEmail.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
        field: 'email'
      })
    }

    // Check if phone already exists
    const [existingPhone] = await db.query(
      'SELECT id FROM registrations WHERE phone = ?',
      [phone]
    )

    if (existingPhone.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Phone number already registered',
        field: 'phone'
      })
    }

    // Check if roll number already exists
    const [existingRoll] = await db.query(
      'SELECT id FROM registrations WHERE roll_number = ?',
      [rollNumber]
    )

    if (existingRoll.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Roll number already registered',
        field: 'rollNumber'
      })
    }

    // Insert new registration
    const [result] = await db.query(
      'INSERT INTO registrations (name, email, phone, roll_number, branch, gender, year) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, rollNumber, branch, gender, year]
    )

    // Send confirmation email (async, don't wait for it)
    sendRegistrationEmail({ name, email, rollNumber, branch, gender, year })
      .then(emailResult => {
        if (emailResult.success) {
          console.log(`✅ Confirmation email sent to ${email}`)
        } else {
          console.log(
            `⚠️ Email sending failed for ${email}: ${emailResult.error}`
          )
        }
      })
      .catch(err => {
        console.error(`❌ Email error for ${email}:`, err.message)
      })

    // Return success response (don't wait for email)
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        id: result.insertId,
        name,
        email,
        phone,
        rollNumber,
        branch,
        gender,
        year
      }
    })
  } catch (error) {
    console.error('Registration error:', error)

    // Handle specific MySQL errors
    if (error.code === 'ER_DUP_ENTRY') {
      // Parse which field caused the duplicate
      let field = 'unknown'
      let message = 'Duplicate entry found'

      if (error.message.includes('email')) {
        field = 'email'
        message = 'Email already registered'
      } else if (error.message.includes('phone')) {
        field = 'phone'
        message = 'Phone number already registered'
      } else if (error.message.includes('roll_number')) {
        field = 'rollNumber'
        message = 'Roll number already registered'
      }

      return res.status(409).json({
        success: false,
        message,
        field
      })
    }

    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again later.'
    })
  }
})

// GET /api/registration/count - Get total registrations count
router.get('/count', async (req, res) => {
  try {
    const [result] = await db.query(
      'SELECT COUNT(*) as count FROM registrations'
    )

    res.status(200).json({
      success: true,
      count: result[0].count
    })
  } catch (error) {
    console.error('Count error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration count'
    })
  }
})

// GET /api/registration/check/:email - Check if email exists
router.get('/check/:email', async (req, res) => {
  try {
    const { email } = req.params

    const [result] = await db.query(
      'SELECT id FROM registrations WHERE email = ?',
      [email]
    )

    res.status(200).json({
      success: true,
      exists: result.length > 0
    })
  } catch (error) {
    console.error('Check email error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to check email'
    })
  }
})

module.exports = router
