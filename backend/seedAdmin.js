const db = require('./config/database');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        // Create admins table
        await db.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Admins table created/checked');

        const email = 'mandalpritam756@gmail.com';
        const password = 'Mandalp166#';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if admin exists
        const [existing] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
        
        if (existing.length === 0) {
            await db.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);
            console.log('✅ Admin user created');
        } else {
            // Update password just in case
            await db.query('UPDATE admins SET password = ? WHERE email = ?', [hashedPassword, email]);
            console.log('✅ Admin user updated');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedAdmin();
