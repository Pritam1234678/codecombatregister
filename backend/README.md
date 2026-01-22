# CODECOMBAT Backend API

Node.js + Express + MySQL backend for handling CODECOMBAT registrations.

## Features

- ✅ **High Concurrency**: Connection pool supporting 100+ concurrent connections
- ✅ **Input Validation**: Express-validator for all fields
- ✅ **Rate Limiting**: 10 requests per minute per IP
- ✅ **Security**: Helmet.js for security headers
- ✅ **CORS**: Configured for frontend integration
- ✅ **Error Handling**: Comprehensive error handling
- ✅ **Duplicate Prevention**: Email uniqueness check

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your MySQL credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=codecombat_db
PORT=5000
```

### 3. Create Database

Run the SQL schema:

```bash
mysql -u root -p < database/schema.sql
```

Or manually:
```sql
CREATE DATABASE codecombat_db;
USE codecombat_db;
-- Then run the schema from database/schema.sql
```

### 4. Start Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### POST /api/registration/register
Register a new participant.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "rollNumber": "21CS001",
  "branch": "CSE"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "rollNumber": "21CS001",
    "branch": "CSE"
  }
}
```

**Response (Error - 409):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

### GET /api/registration/count
Get total registration count.

**Response:**
```json
{
  "success": true,
  "count": 150
}
```

### GET /api/registration/check/:email
Check if email is already registered.

**Response:**
```json
{
  "success": true,
  "exists": true
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2026-01-22T00:00:00.000Z"
}
```

## Database Schema

```sql
CREATE TABLE registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  roll_number VARCHAR(50) NOT NULL,
  branch VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
```

## Performance

- **Connection Pool**: 100 concurrent connections
- **Rate Limiting**: 10 requests/minute per IP
- **Indexed Queries**: Email field indexed for fast lookups
- **Optimized**: Can handle 400+ concurrent submissions

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Validation Error
- `409` - Duplicate Email
- `429` - Too Many Requests (Rate Limited)
- `500` - Server Error
