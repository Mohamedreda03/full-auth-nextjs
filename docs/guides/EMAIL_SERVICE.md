# Email Service Setup

For **Magic Link**, **OTP**, and **Password Reset** features to work, you need to set up an email service.

---

## Available Options

### 1. 🚀 Resend (Recommended - Easiest)

[Resend](https://resend.com) is a modern email service designed for developers.

#### Advantages:

- ✅ Very easy setup
- ✅ 100 free emails per day
- ✅ Very simple API
- ✅ Excellent developer support

#### Setup Steps:

1. **Sign up for Resend**:

   - Go to [resend.com](https://resend.com)
   - Create a free account

2. **Get API Key**:

   - After logging in, go to "API Keys"
   - Click "Create API Key"
   - Copy the API Key

3. **Install Resend library**:

   ```bash
   npm install resend
   ```

4. **Add variables in `.env.local`**:

   ```env
   RESEND_API_KEY="re_your_api_key_here"
   EMAIL_FROM="onboarding@resend.dev"  # or your own domain
   ```

5. **Create Email Service** (`src/lib/email.ts`):

   ```typescript
   import { Resend } from "resend";

   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function sendEmail({
     to,
     subject,
     html,
   }: {
     to: string;
     subject: string;
     html: string;
   }) {
     try {
       const { data, error } = await resend.emails.send({
         from: process.env.EMAIL_FROM || "onboarding@resend.dev",
         to,
         subject,
         html,
       });

       if (error) {
         console.error("Email error:", error);
         throw error;
       }

       return data;
     } catch (error) {
       console.error("Failed to send email:", error);
       throw error;
     }
   }
   ```

---

### 2. 📧 Gmail SMTP (for Local Development)

Use Gmail to send emails (suitable for development only).

#### Setup Steps:

1. **Enable 2-Step Verification in Gmail**:

   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable "2-Step Verification"

2. **Create App Password**:

   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Choose "Mail" and "Other (Custom name)"
   - Name the app (e.g., "Next.js Auth")
   - Copy the generated 16-character password

3. **Install nodemailer**:

   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

4. **Add variables in `.env.local`**:

   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-16-char-app-password"
   EMAIL_FROM="your-email@gmail.com"
   ```

5. **Create Email Service** (`src/lib/email.ts`):

   ```typescript
   import nodemailer from "nodemailer";

   const transporter = nodemailer.createTransporter({
     host: process.env.SMTP_HOST,
     port: Number(process.env.SMTP_PORT),
     secure: false,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASSWORD,
     },
   });

   export async function sendEmail({
     to,
     subject,
     html,
   }: {
     to: string;
     subject: string;
     html: string;
   }) {
     try {
       const info = await transporter.sendMail({
         from: process.env.EMAIL_FROM,
         to,
         subject,
         html,
       });

       console.log("Email sent:", info.messageId);
       return info;
     } catch (error) {
       console.error("Failed to send email:", error);
       throw error;
     }
   }
   ```

⚠️ **Note**: Gmail has a limit of 500 emails per day and is not recommended for production.

---

### 3. 📮 SendGrid (for Production)

[SendGrid](https://sendgrid.com) is a professional service with a good free plan.

#### Advantages:

- ✅ 100 free emails per day (always)
- ✅ High reliability
- ✅ Detailed statistics

#### Setup Steps:

1. **Sign up for SendGrid**:

   - Go to [sendgrid.com](https://sendgrid.com)
   - Create a free account

2. **Get API Key**:

   - Settings → API Keys
   - Create API Key
   - Copy the API Key

3. **Install SendGrid library**:

   ```bash
   npm install @sendgrid/mail
   ```

4. **Add variables in `.env.local`**:

   ```env
   SENDGRID_API_KEY="SG.your_api_key_here"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

5. **Create Email Service** (`src/lib/email.ts`):

   ```typescript
   import sgMail from "@sendgrid/mail";

   sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

   export async function sendEmail({
     to,
     subject,
     html,
   }: {
     to: string;
     subject: string;
     html: string;
   }) {
     try {
       await sgMail.send({
         to,
         from: process.env.EMAIL_FROM || "",
         subject,
         html,
       });
     } catch (error) {
       console.error("Failed to send email:", error);
       throw error;
     }
   }
   ```

---

## Create Email Templates

After setting up the email service, create email templates:

### 1. Magic Link Email

```typescript
// src/lib/email-templates.ts
export function magicLinkEmail(link: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Sign in to Your Account</h2>
          <p>Click the button below to sign in. This link will expire in 15 minutes.</p>
          <a href="${link}" class="button">Sign In</a>
          <p>Or copy and paste this link:</p>
          <p>${link}</p>
          <p>If you didn't request this email, you can safely ignore it.</p>
        </div>
      </body>
    </html>
  `;
}
```

### 2. OTP Email

```typescript
export function otpEmail(code: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .code {
            font-size: 32px;
            font-weight: bold;
            color: #4F46E5;
            letter-spacing: 8px;
            text-align: center;
            padding: 20px;
            background-color: #F3F4F6;
            border-radius: 6px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Your Verification Code</h2>
          <p>Use this code to sign in:</p>
          <div class="code">${code}</div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, you can safely ignore this email.</p>
        </div>
      </body>
    </html>
  `;
}
```

### 3. Password Reset Email

```typescript
export function passwordResetEmail(link: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #DC2626;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Reset Your Password</h2>
          <p>You requested to reset your password. Click the button below:</p>
          <a href="${link}" class="button">Reset Password</a>
          <p>Or copy and paste this link:</p>
          <p>${link}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      </body>
    </html>
  `;
}
```

---

## Test Email Sending

After setup, test email sending:

```typescript
// test-email.ts
import { sendEmail } from "./src/lib/email";
import { otpEmail } from "./src/lib/email-templates";

async function test() {
  await sendEmail({
    to: "your-email@gmail.com",
    subject: "Test OTP Email",
    html: otpEmail("123456"),
  });
  console.log("Email sent!");
}

test();
```

```bash
npx tsx test-email.ts
```

---

## Summary

| Service        | Best For          | Price          | Ease       |
| -------------- | ----------------- | -------------- | ---------- |
| **Resend**     | Everyone          | Free (100/day) | ⭐⭐⭐⭐⭐ |
| **Gmail SMTP** | Local Development | Free           | ⭐⭐⭐     |
| **SendGrid**   | Production        | Free (100/day) | ⭐⭐⭐⭐   |

**Recommendation**: Use **Resend** - easiest and fastest to set up! 🚀
