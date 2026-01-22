# Backend Setup Instructions

## Quick Setup Steps

### 1. Create MySQL Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE codecombat_db;
USE codecombat_db;
```

Then run the schema file:

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p codecombat_db < database/schema.sql
```

**Option B: Copy-paste in MySQL Workbench**
Open `database/schema.sql` and execute it in MySQL Workbench.

### 2. Configure .env File

Edit `backend/.env` and update your MySQL password:

```env
DB_PASSWORD=your_mysql_password_here
```

### 3. Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ MySQL Database connected successfully
🚀 Server running on port 5000
```

### 4. Test the API

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

## Verification

Once backend is running:
1. Keep backend running (`npm run dev` in backend folder)
2. Keep frontend running (`npm run dev` in main folder)
3. Go to `http://localhost:3000/register`
4. Fill the form and submit
5. Check if data is saved in MySQL:
   ```sql
   SELECT * FROM codecombat_db.registrations;
   ```

## Unique Field Validation

The system prevents duplicate entries for:
- ✅ **Email** - Must be unique
- ✅ **Phone Number** - Must be unique  
- ✅ **Roll Number** - Must be unique

If you try to register with an existing email/phone/roll number, you'll get an error message.
