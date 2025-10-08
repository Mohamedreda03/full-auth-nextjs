# 🔢 Email OTP Authentication

دليل كامل لتسجيل الدخول باستخدام رمز OTP (One-Time Password).

---

## ✅ الحالة

**مُفعّل** - يحتاج Resend API للعمل.

---

## 📋 المتطلبات

- ✅ قاعدة بيانات PostgreSQL
- 📧 **Resend API key** (مطلوب!)

---

## 🔧 الإعداد

### 1. Resend API

```env
# في .env.local
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="onboarding@resend.dev"
```

### 2. Configuration في `src/lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { sendEmail } from "./email";
import { otpTemplate } from "./email-templates";

export const auth = betterAuth({
  // ... database config

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        await sendEmail({
          to: email,
          subject: `Your verification code: ${otp}`,
          html: otpTemplate(otp, type),
        });
      },
      otpLength: 6, // طول الرمز
      expiresIn: 600, // 10 دقائق
      allowedAttempts: 3, // عدد المحاولات المسموحة
      overrideDefaultEmailVerification: false,
    }),
  ],
});
```

### 3. Client Plugin في `src/lib/auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [emailOTPClient()],
});
```

---

## 🎨 الواجهة (UI)

### في Sign-In Page

```typescript
import { authClient } from "@/lib/auth-client";

const [otpSent, setOtpSent] = useState(false);
const [email, setEmail] = useState("");

// Step 1: إرسال OTP
async function handleOTPRequest(data: { email: string }) {
  const result = await authClient.signIn.emailOtp({
    email: data.email,
  });

  if (result.error) {
    // Handle error
    return;
  }

  setEmail(data.email);
  setOtpSent(true);
}

// Step 2: التحقق من OTP
async function handleOTPVerify(data: { otp: string }) {
  const result = await authClient.signIn.emailOtp.verify({
    email: email,
    otp: data.otp,
  });

  if (result.error) {
    // Handle error - invalid OTP
    return;
  }

  // Success - redirect
  router.push("/");
}
```

---

## 🔄 التدفق (Flow)

```
1. المستخدم يُدخل بريده
   ↓
2. Better Auth يُولّد 6-digit OTP
   ↓
3. Email يُرسل عبر Resend
   ↓
4. المستخدم يفتح بريده
   ↓
5. ينسخ الـ OTP
   ↓
6. يُدخل OTP في التطبيق
   ↓
7. Better Auth يتحقق من OTP
   ↓
8. تسجيل دخول تلقائي
```

---

## 📁 الملفات المطلوبة

### Core Files

- ✅ `src/lib/auth.ts` - Server config with plugin
- ✅ `src/lib/auth-client.ts` - Client plugin
- ✅ `src/lib/email.ts` - Email service
- ✅ `src/lib/email-templates.ts` - OTP template

### UI Files

- ✅ `src/app/(auth)/sign-in/page.tsx` - OTP tab with 2 steps

---

## 🧪 الاختبار

```bash
# 1. تأكد من Resend API في .env.local
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# 2. أعد تشغيل التطبيق
npm run dev

# 3. اذهب إلى sign-in
http://localhost:3000/sign-in

# 4. اختر "OTP" tab

# 5. أدخل بريدك

# 6. تحقق من بريدك

# 7. أدخل الـ 6-digit code

# 8. يجب أن تسجل دخول تلقائياً
```

---

## ❌ التعطيل

### 1. حذف من `src/lib/auth.ts`

```typescript
// احذف import
// import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    // احذف من plugins array
    // emailOTP({ ... }),
  ],
});
```

### 2. حذف من `src/lib/auth-client.ts`

```typescript
// احذف import
// import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    // احذف من plugins
    // emailOTPClient(),
  ],
});
```

### 3. حذف UI Tab

احذف OTP tab من `src/app/(auth)/sign-in/page.tsx`

### 4. حذف Template

احذف `otpTemplate` من `src/lib/email-templates.ts`

---

## 🐛 المشاكل الشائعة

### 1. Email لا يصل

```bash
# تحقق من:
✅ RESEND_API_KEY صحيح
✅ EMAIL_FROM verified
✅ تحقق من Spam folder
✅ تحقق من terminal logs
```

### 2. "Invalid OTP"

```bash
# الأسباب:
- الرمز خاطئ (double-check)
- الرمز expired (10 دقائق افتراضياً)
- تجاوزت عدد المحاولات (3 افتراضياً)
- اطلب OTP جديد
```

### 3. "Too many attempts"

```bash
# الحل:
- انتظر قليلاً
- اطلب OTP جديد
- أو زد allowedAttempts في config
```

---

## ⚙️ التخصيص

### تغيير طول الرمز

```typescript
emailOTP({
  otpLength: 6,     // افتراضي
  // otpLength: 4,  // أقصر
  // otpLength: 8,  // أطول
}),
```

### تغيير مدة الصلاحية

```typescript
emailOTP({
  expiresIn: 600,    // 10 minutes (default)
  // expiresIn: 300, // 5 minutes
  // expiresIn: 900, // 15 minutes
}),
```

### تغيير عدد المحاولات

```typescript
emailOTP({
  allowedAttempts: 3,  // افتراضي
  // allowedAttempts: 5,
}),
```

### استخدام OTP للـ Email Verification

```typescript
emailOTP({
  overrideDefaultEmailVerification: true, // استخدم OTP بدل Link
}),
```

---

## 🎯 حالات الاستخدام

### متى تستخدم OTP؟

✅ **استخدمه عندما**:

- تحتاج أمان عالي (مثل تطبيقات البنوك)
- المستخدمون معتادون على OTP
- تريد 2FA مدمج
- تريد UX أسرع من Magic Link (لا حاجة للذهاب للبريد والعودة)

❌ **لا تستخدمه عندما**:

- المستخدمون غير tech-savvy
- البريد الإلكتروني بطيء في الوصول
- تريد passwordless بدون friction

---

## 🔒 الأمان

### Best Practices

✅ **افعل**:

- استخدم OTP length كافي (6 أرقام)
- حدّد عدد المحاولات
- استخدم مدة صلاحية قصيرة
- Rate limiting للـ OTP requests

❌ **لا تفعل**:

- لا تستخدم OTP طويل جداً (UX سيء)
- لا تجعل expiry طويل جداً
- لا تسمح بمحاولات غير محدودة

---

## 📚 المزيد

- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Better Auth Email OTP Docs](https://www.better-auth.com/docs/plugins/email-otp)
- [Modular Setup](../guides/MODULAR_SETUP.md#4-email-otp)

---

**OTP = أمان عالي + تجربة مألوفة! 🔢**
