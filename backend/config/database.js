const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool for handling multiple concurrent connections
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Mandalp166#',
  database: process.env.DB_NAME || 'codecombat_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 100, // Support 100 concurrent connections
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0, // Unlimited queue
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });

module.exports = pool;
