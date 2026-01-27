const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../config/database')
const authMiddleware = require('../middleware/authMiddleware')

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check admin in DB
    const [admins] = await db.query('SELECT * FROM admins WHERE email = ?', [
      email
    ])

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const admin = admins[0]

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Generate Token
    const token = jwt.sign(
      { id: admin.id, role: 'admin', email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      success: true,
      token,
      admin: {
        email: admin.email,
        role: 'admin'
      }
    })

    // Send Login Alert (Async - Fire and Forget)
    const emailService = require('../services/emailService')
    const loginIp =
      req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress

    // Fetch Location Data (Async)
    fetch(`http://ip-api.com/json/${loginIp}`)
      .then(res => res.json())
      .then(data => {
        const location =
          data.status === 'success'
            ? `${data.city}, ${data.regionName}, ${data.country}`
            : 'Unknown Location'
        const isp = data.isp || 'Unknown ISP'

        emailService
          .sendAdminLoginAlert({
            email: admin.email,
            ip: loginIp,
            userAgent: req.headers['user-agent'],
            location: location,
            isp: isp
          })
          .catch(err => console.error('Alert Error:', err))
      })
      .catch(err => {
        // Fallback if IP API fails
        emailService
          .sendAdminLoginAlert({
            email: admin.email,
            ip: loginIp,
            userAgent: req.headers['user-agent'],
            location: 'Location Lookup Failed',
            isp: 'Unknown'
          })
          .catch(e => console.error('Alert Error:', e))
      })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// GET /api/admin/verify - Verify Token
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ success: true, valid: true })
})

// GET /api/admin/users - Get All Users
router.get('/users', authMiddleware, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT * FROM registrations ORDER BY created_at DESC'
    )
    res.json({ success: true, count: users.length, users })
  } catch (error) {
    console.error('Fetch Users Error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch users' })
  }
})

// PUT /api/admin/users/:id - Update User
const { body, validationResult } = require('express-validator')

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

router.put(
  '/users/:id',
  [
    authMiddleware,
    // Validation Rules
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phone')
      .matches(/^[0-9]{10}$/)
      .withMessage('Phone must be exactly 10 digits'),
    body('rollNumber')
      .trim()
      .notEmpty()
      .withMessage('Roll Number is required')
      .matches(/^[0-9]+$/)
      .withMessage('Roll Number must be numeric'),
    body('branch')
      .trim()
      .notEmpty()
      .withMessage('Branch is required')
      .isIn(ALLOWED_BRANCHES)
      .withMessage('Invalid Branch selection'),
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
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, message: errors.array()[0].msg })
      }

      const { id } = req.params
      const { name, email, phone, rollNumber, branch, gender, year } = req.body

      const [result] = await db.query(
        'UPDATE registrations SET name = ?, email = ?, phone = ?, roll_number = ?, branch = ?, gender = ?, year = ? WHERE id = ?',
        [name, email, phone, rollNumber, branch, gender, year, id]
      )

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found' })
      }

      res.json({ success: true, message: 'User updated successfully' })
    } catch (error) {
      console.error('Update User Error:', error)
      res.status(500).json({ success: false, message: 'Failed to update user' })
    }
  }
)

// DELETE /api/admin/users/:id - Delete User
router.delete('/users/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.query('DELETE FROM registrations WHERE id = ?', [
      id
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.json({ success: true, message: 'User deleted successfully' })
  } catch (error) {
    console.error('Delete User Error:', error)
    res.status(500).json({ success: false, message: 'Failed to delete user' })
  }
})

module.exports = router
