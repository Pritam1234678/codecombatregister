const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'support@codecombat.live',
    pass: process.env.SMTP_PASSWORD || ''
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email service configuration error:', error.message);
  } else {
    console.log('✅ Email service ready');
  }
});

/**
 * Send registration confirmation email
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Email send result
 */
async function sendRegistrationEmail(userData) {
  const { name, email, rollNumber, branch } = userData;

  let htmlTemplate;
  try {
    const templatePath = path.join(__dirname, '../templates/registrationEmail.html');
    htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders
    htmlTemplate = htmlTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{email}}/g, email)
      .replace(/{{rollNumber}}/g, rollNumber)
      .replace(/{{branch}}/g, branch)
      .replace(/{{year}}/g, new Date().getFullYear());
  } catch (err) {
    console.error('❌ Error reading email template:', err);
    // Fallback simple HTML if template fails
    htmlTemplate = `<h1>Registration Successful</h1><p>Welcome ${name}!</p>`;
  }

  const textTemplate = `
CODECOMBAT - Registration Confirmation

Dear ${name},

Welcome to the arena! Your registration for CODECOMBAT has been confirmed.

Registration Details:
- Name: ${name}
- Email: ${email}
- Roll Number: ${rollNumber}
- Branch: ${branch}

You are now officially registered for the ultimate competitive coding battle organized by IEEE CTSoc.

What's Next?
- Keep an eye on your email for event updates
- Join our community channels for announcements
- Prepare your coding skills for the battle ahead
- Event details will be shared soon

If you have any questions, contact us at support@codecombat.live

---
CODECOMBAT
Organized by IEEE CTSoc
© ${new Date().getFullYear()} IEEE CTSoc. All rights reserved.
  `;

  const mailOptions = {
    from: {
      name: 'CODECOMBAT',
      address: 'no-reply@codecombat.live'
    },
    to: email,
    subject: '🎉 Registration Confirmed - CODECOMBAT',
    text: textTemplate,
    html: htmlTemplate
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to:', email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send support/contact form email to support@codecombat.live
 * @param {Object} formData - Support form data
 * @returns {Promise<Object>} Email send result
 */
async function sendSupportEmail(formData) {
  const { name, email, subject, message } = formData;

  let htmlTemplate;
  try {
    const templatePath = path.join(__dirname, '../templates/supportEmail.html');
    htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders
    htmlTemplate = htmlTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{email}}/g, email)
      .replace(/{{subject}}/g, subject)
      .replace(/{{message}}/g, message)
      .replace(/{{timestamp}}/g, new Date().toLocaleString('en-US', { 
        dateStyle: 'full', 
        timeStyle: 'short' 
      }));
  } catch (err) {
    console.error('❌ Error reading support email template:', err);
    // Fallback simple HTML if template fails
    htmlTemplate = `<h1>Support Request</h1><p>From: ${name} (${email})</p><p>Subject: ${subject}</p><p>${message}</p>`;
  }

  const textTemplate = `
CODECOMBAT - Support Request

From: ${name} (${email})
Subject: ${subject}

Message:
${message}

---
Reply to this email to respond directly to the sender.
Received: ${new Date().toLocaleString()}
  `;

  const mailOptions = {
    from: {
      name: 'CODECOMBAT',
      address: 'support@codecombat.live'
    },
    to: 'mandalpritam756@gmail.com',
    replyTo: email,
    subject: `Support Request: ${subject}`,
    text: textTemplate,
    html: htmlTemplate
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Support email sent successfully to ${mailOptions.to}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Support email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendRegistrationEmail,
  sendSupportEmail,
  sendAdminLoginAlert
};

/**
 * Send Admin Login Alert
 * @param {Object} loginData - Login details (email, ip, userAgent)
 */
async function sendAdminLoginAlert(loginData) {
  const { email, ip, userAgent } = loginData;

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; background: #000; color: #fff;">
      <h1 style="color: #ff0000; text-align: center;">⚠️ ADMIN LOGIN DETECTED</h1>
      <div style="padding: 20px; background: #111; border-radius: 5px;">
        <p style="font-size: 16px;">New successful login to Admin Dashboard.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; color: #ccc;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #333;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #333;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #333;"><strong>IP Address:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #333;">${ip}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #333;"><strong>Device/Agent:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #333;">${userAgent}</td>
          </tr>
           <tr>
            <td style="padding: 8px; border-bottom: 1px solid #333;"><strong>Time:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #333;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 14px; color: #888;">If this wasn't you, please change your password immediately.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: {
      name: 'CODECOMBAT SECURITY',
      address: 'security@codecombat.live'
    },
    to: 'mandalpritam756@gmail.com',
    subject: `⚠️ Admin Login Alert - ${new Date().toLocaleTimeString()}`,
    html: htmlTemplate
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('🚨 Admin login alert sent to owner');
  } catch (error) {
    console.error('❌ Failed to send login alert:', error.message);
  }
}
