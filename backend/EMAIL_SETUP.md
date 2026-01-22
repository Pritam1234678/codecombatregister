# Email Setup Guide

## 📧 Email Configuration

The system sends professional confirmation emails from `support@codecombat.live` to users after successful registration.

## Setup Steps

### 1. Configure Email Credentials

Edit `backend/.env` and add your SMTP credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=support@codecombat.live
SMTP_PASSWORD=your_app_password_here
```

### 2. Gmail App Password Setup (Recommended)

If using Gmail:

1. Go to Google Account Settings
2. Security → 2-Step Verification (enable if not already)
3. App Passwords → Generate new app password
4. Select "Mail" and "Other (Custom name)"
5. Copy the 16-character password
6. Paste it in `SMTP_PASSWORD` in `.env`

### 3. Alternative Email Providers

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

**Custom SMTP:**
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-password
```

## Email Template

The confirmation email includes:

- ✅ Professional CODECOMBAT branding
- ✅ User registration details (name, email, roll number, branch)
- ✅ Event information
- ✅ Next steps for participants
- ✅ Contact information
- ✅ Responsive HTML design

## Testing

### Test Email Sending

After configuring SMTP, register a test user:

```bash
curl -X POST http://localhost:5000/api/registration/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"your-test-email@example.com","phone":"9876543210","rollNumber":"TEST001","branch":"CSE"}'
```

Check backend logs for:
```
✅ Confirmation email sent to your-test-email@example.com
```

## Troubleshooting

### Email Not Sending

**Check backend logs:**
- `❌ Email service configuration error` - SMTP credentials invalid
- `⚠️ Email sending failed` - Network or authentication issue

**Common Issues:**

1. **Gmail blocking sign-in:**
   - Use App Password instead of regular password
   - Enable "Less secure app access" (not recommended)

2. **Connection timeout:**
   - Check firewall settings
   - Verify SMTP port (587 for TLS, 465 for SSL)

3. **Authentication failed:**
   - Double-check email and password
   - Ensure 2FA is enabled for Gmail App Passwords

### Email Goes to Spam

- Add SPF/DKIM records to your domain
- Use a verified email service (SendGrid, AWS SES)
- Avoid spam trigger words in email content

## Production Recommendations

For production use, consider:

1. **SendGrid** - Free tier: 100 emails/day
2. **AWS SES** - $0.10 per 1,000 emails
3. **Mailgun** - Free tier: 5,000 emails/month
4. **Postmark** - Free tier: 100 emails/month

These services provide better deliverability and analytics.

## Email Flow

```
User Registers → Database Insert → Email Sent (Async) → User Gets Confirmation
                                  ↓
                            (Non-blocking, logs success/failure)
```

The email is sent asynchronously, so registration completes immediately even if email fails.
