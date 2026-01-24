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

  // Create a unique ticket ID to prevent threading/spam grouping
  const ticketId = Math.random().toString(36).substring(2, 8).toUpperCase();
  const uniqueSubject = `[Ticket #${ticketId}] ${subject}`;

  const mailOptions = {
    from: {
      name: 'CODECOMBAT SUPPORT',
      address: 'support@codecombat.live'
    },
    to: 'mandalpritam756@gmail.com',
    replyTo: email,
    subject: uniqueSubject,
    text: textTemplate,
    html: htmlTemplate,
    headers: {
      'X-Priority': '3', // Normal priority
      'X-MSMail-Priority': 'Normal',
      'Importance': 'Normal',
      'X-Ticket-ID': ticketId
    }
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
  const { email, ip, userAgent, location, isp } = loginData;

  let htmlTemplate;
  try {
    const templatePath = path.join(__dirname, '../templates/adminLoginAlert.html');
    htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders
    htmlTemplate = htmlTemplate
      .replace(/{{email}}/g, email)
      .replace(/{{ip}}/g, ip)
      .replace(/{{location}}/g, location || 'Unknown')
      .replace(/{{isp}}/g, isp || 'Unknown')
      .replace(/{{userAgent}}/g, userAgent)
      .replace(/{{timestamp}}/g, new Date().toLocaleString());
  } catch (err) {
    console.error('❌ Error reading admin alert template:', err);
    // Fallback
    htmlTemplate = `<h1>⚠️ Admin Login Alert</h1><p>User: ${email}</p><p>IP: ${ip}</p>`;
  }

  const mailOptions = {
    from: {
      name: 'CODECOMBAT SECURITY',
      address: 'security@codecombat.live'
    },
    to: 'mandalpritam756@gmail.com',
    subject: `⚠️ Admin Access Detected - ${new Date().toLocaleTimeString()}`,
    html: htmlTemplate
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('🚨 Admin login alert sent to owner');
  } catch (error) {
    console.error('❌ Failed to send login alert:', error.message);
  }
}
