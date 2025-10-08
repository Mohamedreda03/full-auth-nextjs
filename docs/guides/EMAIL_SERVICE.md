# إعداد خدمة البريد الإلكتروني

لكي تعمل ميزات **Magic Link**، **OTP**، و **Password Reset**، تحتاج إلى إعداد خدمة إرسال البريد الإلكتروني.

---

## الخيارات المتاحة

### 1. 🚀 Resend (موصى به - الأسهل)

[Resend](https://resend.com) هي خدمة بريد إلكتروني حديثة ومصممة للمطورين.

#### المزايا:

- ✅ سهلة الإعداد جداً
- ✅ 100 إيميل مجاني يومياً
- ✅ API بسيط جداً
- ✅ دعم ممتاز للمطورين

#### خطوات الإعداد:

1. **التسجيل في Resend**:

   - اذهب إلى [resend.com](https://resend.com)
   - أنشئ حساب مجاني

2. **الحصول على API Key**:

   - بعد تسجيل الدخول، اذهب إلى "API Keys"
   - اضغط "Create API Key"
   - انسخ الـ API Key

3. **تثبيت مكتبة Resend**:

   ```bash
   npm install resend
   ```

4. **إضافة المتغيرات في `.env.local`**:

   ```env
   RESEND_API_KEY="re_your_api_key_here"
   EMAIL_FROM="onboarding@resend.dev"  # أو نطاقك الخاص
   ```

5. **إنشاء Email Service** (`src/lib/email.ts`):

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

### 2. 📧 Gmail SMTP (للتطوير المحلي)

استخدم Gmail لإرسال الإيميلات (مناسب للتطوير فقط).

#### خطوات الإعداد:

1. **تفعيل 2-Step Verification في Gmail**:

   - اذهب إلى [Google Account Security](https://myaccount.google.com/security)
   - فعّل "2-Step Verification"

2. **إنشاء App Password**:

   - اذهب إلى [App Passwords](https://myaccount.google.com/apppasswords)
   - اختر "Mail" و "Other (Custom name)"
   - سم التطبيق (مثلاً: "Next.js Auth")
   - انسخ كلمة المرور المكونة من 16 حرف

3. **تثبيت nodemailer**:

   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

4. **إضافة المتغيرات في `.env.local`**:

   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-16-char-app-password"
   EMAIL_FROM="your-email@gmail.com"
   ```

5. **إنشاء Email Service** (`src/lib/email.ts`):

   ```typescript
   import nodemailer from "nodemailer";

   const transporter = nodemailer.createTransport({
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

⚠️ **ملاحظة**: Gmail لديه حد 500 إيميل يومياً، ولا يُنصح به للإنتاج.

---

### 3. 📮 SendGrid (للإنتاج)

[SendGrid](https://sendgrid.com) خدمة احترافية مع خطة مجانية جيدة.

#### المزايا:

- ✅ 100 إيميل مجاني يومياً (دائماً)
- ✅ موثوقية عالية
- ✅ إحصائيات مفصلة

#### خطوات الإعداد:

1. **التسجيل في SendGrid**:

   - اذهب إلى [sendgrid.com](https://sendgrid.com)
   - أنشئ حساب مجاني

2. **الحصول على API Key**:

   - Settings → API Keys
   - Create API Key
   - انسخ الـ API Key

3. **تثبيت مكتبة SendGrid**:

   ```bash
   npm install @sendgrid/mail
   ```

4. **إضافة المتغيرات في `.env.local`**:

   ```env
   SENDGRID_API_KEY="SG.your_api_key_here"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

5. **إنشاء Email Service** (`src/lib/email.ts`):

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

## إنشاء Email Templates

بعد إعداد خدمة البريد، قم بإنشاء قوالب البريد الإلكتروني:

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

## اختبار إرسال البريد

بعد الإعداد، اختبر إرسال البريد:

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

## الخلاصة

| الخدمة         | الأفضل لـ      | السعر           | السهولة    |
| -------------- | -------------- | --------------- | ---------- |
| **Resend**     | الجميع         | مجاني (100/يوم) | ⭐⭐⭐⭐⭐ |
| **Gmail SMTP** | التطوير المحلي | مجاني           | ⭐⭐⭐     |
| **SendGrid**   | الإنتاج        | مجاني (100/يوم) | ⭐⭐⭐⭐   |

**التوصية**: استخدم **Resend** - الأسهل والأسرع للإعداد! 🚀
