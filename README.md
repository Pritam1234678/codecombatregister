# 🎮 CodeCombat Registration System

A modern, full-stack registration system for CodeCombat events with email notifications, smooth animations, and professional UI.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)
- **Git**

---

## 🚀 Setup Instructions (New Laptop)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Pritam1234678/codecombatregister.git
cd codecombatregister
```

### 2️⃣ Frontend Setup

```bash
# Install frontend dependencies
npm install

# Run development server
npm run dev
```

Frontend will run on: **http://localhost:3000**

### 3️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
```

### 4️⃣ Configure Environment Variables

Edit `backend/.env` with your credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=codecombat_db
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Email Configuration (SMTP)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-email@codecombat.live
SMTP_PASSWORD=your_email_password

# Support Email
SUPPORT_EMAIL=support@codecombat.live
```

### 5️⃣ Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE codecombat_db;

# Import schema
USE codecombat_db;
SOURCE backend/database/schema.sql;

# Exit MySQL
exit;
```

### 6️⃣ Run Backend Server

```bash
# From backend directory
node server.js
```

Backend will run on: **http://localhost:5000**

---

## 🔧 Development Workflow

### Running Both Servers

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd backend
node server.js
```

### Testing Email Functionality

1. **Registration Email**: Sent from `no-reply@codecombat.live`
2. **Support Email**: Sent to `support@codecombat.live` (or configured email)

---

## 📂 Project Structure

```
codecombatregister/
├── app/                      # Next.js frontend
│   ├── components/          # React components
│   ├── register/            # Registration page
│   ├── support/             # Support page
│   └── globals.css          # Global styles
├── backend/                 # Node.js backend
│   ├── config/             # Database config
│   ├── routes/             # API routes
│   ├── services/           # Email services
│   ├── templates/          # Email templates
│   └── server.js           # Express server
└── public/                 # Static assets
```

---

## 🎨 Key Features

- ✨ **Cinematic Hero Section**: Parallax effects and GSAP text reveals
- 🏆 **Rewards Section**: Scroll-triggered animations for prize cards
- 🎯 **Custom Cursor**: Magnetic, blend-mode enabled cursor
- 🌊 **Smooth Scrolling**: Optimized Lenis scroll (zero-lag, fast)
- 📧 **Email Notifications**: Professional HTML email templates
- 🔒 **Form Validation**: Client & server-side validation
- 📱 **Responsive Design**: Mobile-optimized UI

---

## 🔄 Git Workflow

### Pushing Changes
```bash
git add .
git commit -m "your commit message"
git push origin main
```

### Pulling Latest Changes
```bash
git pull origin main
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Frontend)
netstat -ano | findstr :3000
taskkill /F /PID <PID>

# Kill process on port 5000 (Backend)
netstat -ano | findstr :5000
taskkill /F /PID <PID>
```

### Database Connection Error
- Verify MySQL is running
- Check credentials in `backend/.env`
- Ensure database `codecombat_db` exists

### Email Not Sending
- Verify SMTP credentials in `backend/.env`
- Check email service logs in terminal
- Ensure firewall allows SMTP port (465/587)

---

## 📧 Contact

For issues or questions, contact: **support@codecombat.live**

---

## 📝 License

This project is private and proprietary.
