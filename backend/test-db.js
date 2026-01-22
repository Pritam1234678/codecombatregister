require('dotenv').config();
const mysql = require('mysql2/promise');

console.log('--- Debug Info ---');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
const pass = process.env.DB_PASSWORD;
console.log('DB_PASSWORD length:', pass ? pass.length : 'undefined');
console.log('DB_PASSWORD first char:', pass ? pass[0] : 'N/A');
console.log('DB_PASSWORD last char:', pass ? pass[pass.length - 1] : 'N/A');
console.log('DB_NAME:', process.env.DB_NAME);

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('✅ Connection successful!');
    await connection.end();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

testConnection();
