const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const registrationRoutes = require('./routes/registration');
const supportRoutes = require('./routes/support');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy (required for correct IP detection behind load balancers/reverse proxies)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom IP extraction to handle Azure's IP:Port format
const getClientIp = (req) => {
  let ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  // If IP is IPv4 mapped (::ffff:1.2.3.4), strip prefix
  if (ip && ip.toString().startsWith('::ffff:')) {
    ip = ip.toString().replace('::ffff:', '');
  }
  // If IP has port (1.2.3.4:12345), remove port
  if (ip && ip.toString().includes(':') && ip.toString().indexOf('.') !== -1) {
    ip = ip.toString().split(':')[0];
  }
  return ip || '127.0.0.1';
};

// Global Rate Limiting - 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIp,
  validate: { trustProxy: false }
});

// Strict Registration Rate Limiting - 5 requests per hour per IP
const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  message: {
    success: false,
    message: 'Too many registration attempts from this IP, please try again after an hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIp,
  validate: { trustProxy: false }
});

// Strict Admin Login Rate Limiting - 5 requests per 15 minutes per IP
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIp,
  validate: { trustProxy: false }
});

// Apply global limiter to all API routes
app.use('/api/', globalLimiter);

// Routes
// Apply strict limiter specifically to registration route
app.use('/api/registration', registrationLimiter, registrationRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/admin/login', adminLoginLimiter);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

 
