# 🧩 Modular Authentication Setup - الإعداد المرن

هذا الدليل يشرح **كيفية تفعيل أو تعطيل** كل طريقة مصادقة حسب احتياجاتك.

---

## 📋 جدول المحتويات

- [الاختيارات المتاحة](#الاختيارات-المتاحة)
- [السيناريوهات الشائعة](#السيناريوهات-الشائعة)
- [Email & Password](#1-email--password)
- [Google OAuth](#2-google-oauth)
- [Magic Link](#3-magic-link)
- [Email OTP](#4-email-otp)
- [Password Reset](#5-password-reset)
- [Email Verification](#6-email-verification)

---

## 🎯 الاختيارات المتاحة

| الطريقة                | يمكن تعطيلها؟ | التبعيات          | الملفات المتأثرة                            |
| ---------------------- | ------------- | ----------------- | ------------------------------------------- |
| **Email & Password**   | ✅ نعم        | Database          | `auth.ts`, `sign-in/up pages`               |
| **Google OAuth**       | ✅ نعم        | Database          | `auth.ts`, `sign-in/up pages`               |
| **Magic Link**         | ✅ نعم        | Database + Resend | `auth.ts`, `auth-client.ts`, `sign-in page` |
| **Email OTP**          | ✅ نعم        | Database + Resend | `auth.ts`, `auth-client.ts`, `sign-in page` |
| **Password Reset**     | ⚠️ يعتمد\*    | Database + Resend | `auth.ts`, `forgot/reset pages`             |
| **Email Verification** | ⚠️ يعتمد\*    | Database + Resend | `auth.ts`                                   |

> **\*** Password Reset يعتمد على Email & Password. Email Verification اختياري ولكن موصى به.

---

## 🎬 السيناريوهات الشائعة

### السيناريو 1: Email/Password فقط

```
✅ Email & Password
❌ Google OAuth
❌ Magic Link
❌ Email OTP
⚠️ Password Reset (موصى به)
⚠️ Email Verification (موصى به)
```

### السيناريو 2: Email/Password + Google

```
✅ Email & Password
✅ Google OAuth
❌ Magic Link
❌ Email OTP
⚠️ Password Reset (موصى به)
⚠️ Email Verification (موصى به)
```

### السيناريو 3: جميع الطرق

```
✅ Email & Password
✅ Google OAuth
✅ Magic Link
✅ Email OTP
✅ Password Reset
✅ Email Verification
```

### السيناريو 4: Passwordless فقط

```
❌ Email & Password
❌ Google OAuth
✅ Magic Link
✅ Email OTP
❌ Password Reset
❌ Email Verification
```

---

## 1. Email & Password

### ✅ للتفعيل (مُفعّل افتراضياً)

**لا يوجد تغيير مطلوب** - هذه الطريقة مُفعّلة بالفعل.

### ❌ للتعطيل

#### الخطوة 1: تعطيل في `src/lib/auth.ts`

```typescript
export const auth = betterAuth({
  // ... database config
  // احذف أو عطّل هذا القسم
  // emailAndPassword: {
  //   enabled: true,
  //   requireEmailVerification: true,
  //   sendResetPassword: async ({ user, url }) => {
  //     // ...
  //   },
  // },
  // ... rest of config
});
```

#### الخطوة 2: حذف UI من `src/app/(auth)/sign-in/page.tsx`

احذف القسم التالي:

```typescript
// احذف هذا
{
  authMethod === "password" && <Form {...form}>{/* ... password form */}</Form>;
}
```

#### الخطوة 3: حذف UI من `src/app/(auth)/sign-up/page.tsx`

احذف form الـ password بالكامل.

#### الخطوة 4: حذف الصفحات التالية (إذا لم تستخدم Password Reset)

```bash
rm src/app/(auth)/forgot-password/page.tsx
rm src/app/(auth)/reset-password/page.tsx
```

---

## 2. Google OAuth

### ✅ للتفعيل (مُفعّل افتراضياً)

#### المتطلبات:

```env
# في .env.local
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

**الإعداد**:

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ OAuth 2.0 credentials
3. Redirect URI: `http://localhost:3000/api/auth/callback/google`
4. أضف credentials في `.env.local`

### ❌ للتعطيل

#### الخطوة 1: تعطيل في `src/lib/auth.ts`

```typescript
export const auth = betterAuth({
  // ... database config
  // احذف هذا القسم
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID || "",
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  //   },
  // },
  // ... rest of config
});
```

#### الخطوة 2: حذف UI من `src/app/(auth)/sign-in/page.tsx`

احذف:

```typescript
// احذف Google Sign In button
{
  /* Google Sign In */
}
<Button
  type="button"
  variant="outline"
  className="w-full"
  onClick={handleGoogleSignIn}
  disabled={isLoading}
>
  {/* ... Google SVG */}
  Continue with Google
</Button>;
```

#### الخطوة 3: حذف UI من `src/app/(auth)/sign-up/page.tsx`

احذف نفس الـ Google button.

#### الخطوة 4: حذف المتغيرات من `.env.local`

```env
# احذف هذه
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...
```

---

## 3. Magic Link

### ✅ للتفعيل (مُفعّل افتراضياً)

#### المتطلبات:

```env
# في .env.local
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="onboarding@resend.dev"
```

**الإعداد**: اقرأ [Email Service Guide](./EMAIL_SERVICE.md)

### ❌ للتعطيل

#### الخطوة 1: حذف plugin من `src/lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
// احذف هذا
// import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  // ... database config

  plugins: [
    // احذف magicLink من plugins
    // magicLink({
    //   sendMagicLink: async ({ email, url }) => {
    //     // ...
    //   },
    // }),

    // اترك emailOTP إذا كنت تستخدمه
    emailOTP({
      // ...
    }),
  ],
});
```

#### الخطوة 2: حذف plugin من `src/lib/auth-client.ts`

```typescript
"use client";

import { createAuthClient } from "better-auth/react";
// احذف هذا
// import { magicLinkClient } from "better-auth/client/plugins";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    // احذف magicLinkClient
    // magicLinkClient(),
    emailOTPClient(),
  ],
});
```

#### الخطوة 3: حذف UI من `src/app/(auth)/sign-in/page.tsx`

احذف:

```typescript
// 1. احذف من tabs
<button
  type="button"
  onClick={() => setAuthMethod("magic")}
  // ...
>
  Magic Link
</button>

// 2. احذف Magic Link form
{authMethod === "magic" && (
  // ... احذف كل محتوى Magic Link
)}
```

#### الخطوة 4: حذف template من `src/lib/email-templates.ts`

```typescript
// احذف هذه الدالة
// export function magicLinkTemplate(url: string) {
//   // ...
// }
```

---

## 4. Email OTP

### ✅ للتفعيل (مُفعّل افتراضياً)

#### المتطلبات:

```env
# في .env.local
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="onboarding@resend.dev"
```

**الإعداد**: اقرأ [Email Service Guide](./EMAIL_SERVICE.md)

### ❌ للتعطيل

#### الخطوة 1: حذف plugin من `src/lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
// احذف هذا
// import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  // ... database config

  plugins: [
    magicLink({
      // اترك magicLink إذا كنت تستخدمه
    }),

    // احذف emailOTP
    // emailOTP({
    //   async sendVerificationOTP({ email, otp, type }) {
    //     // ...
    //   },
    //   otpLength: 6,
    //   expiresIn: 600,
    //   overrideDefaultEmailVerification: false,
    // }),
  ],
});
```

#### الخطوة 2: حذف plugin من `src/lib/auth-client.ts`

```typescript
"use client";

import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
// احذف هذا
// import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    magicLinkClient(),
    // احذف emailOTPClient
    // emailOTPClient(),
  ],
});
```

#### الخطوة 3: حذف UI من `src/app/(auth)/sign-in/page.tsx`

احذف:

```typescript
// 1. احذف من tabs
<button
  type="button"
  onClick={() => setAuthMethod("otp")}
  // ...
>
  OTP
</button>

// 2. احذف OTP form
{authMethod === "otp" && (
  // ... احذف كل محتوى OTP
)}
```

#### الخطوة 4: حذف template من `src/lib/email-templates.ts`

```typescript
// احذف هذه الدالة
// export function otpTemplate(otp: string, type: string) {
//   // ...
// }
```

---

## 5. Password Reset

### ✅ للتفعيل (مُفعّل افتراضياً)

#### المتطلبات:

- Email & Password يجب أن يكون مُفعّل
- Resend API

```env
# في .env.local
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="onboarding@resend.dev"
```

### ❌ للتعطيل

#### الخطوة 1: حذف من `src/lib/auth.ts`

```typescript
export const auth = betterAuth({
  // ... database config

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // احذف sendResetPassword
    // sendResetPassword: async ({ user, url }) => {
    //   await sendEmail({
    //     to: user.email,
    //     subject: "Reset Your Password",
    //     html: passwordResetTemplate(url),
    //   });
    // },
  },

  // ... rest of config
});
```

#### الخطوة 2: حذف الصفحات

```bash
rm src/app/(auth)/forgot-password/page.tsx
rm src/app/(auth)/reset-password/page.tsx
```

#### الخطوة 3: حذف الرابط من `src/app/(auth)/sign-in/page.tsx`

```typescript
// احذف هذا
{
  /* <div className="text-sm">
  <Link href="/forgot-password" ...>
    Forgot password?
  </Link>
</div> */
}
```

#### الخطوة 4: حذف template من `src/lib/email-templates.ts`

```typescript
// احذف هذه الدالة
// export function passwordResetTemplate(url: string) {
//   // ...
// }
```

#### الخطوة 5: حذف exports من `src/lib/auth-client.ts`

```typescript
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  // احذف هذه
  // forgetPassword,
  // resetPassword,
  sendVerificationEmail,
} = authClient;
```

---

## 6. Email Verification

### ✅ للتفعيل (مُفعّل افتراضياً)

#### المتطلبات:

- Email & Password يجب أن يكون مُفعّل
- Resend API

```env
# في .env.local
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="onboarding@resend.dev"
```

### ❌ للتعطيل (غير موصى به)

#### الخطوة 1: تعطيل في `src/lib/auth.ts`

```typescript
export const auth = betterAuth({
  // ... database config

  emailAndPassword: {
    enabled: true,
    // غيّر إلى false
    requireEmailVerification: false, // ⚠️ غير موصى به
    sendResetPassword: async ({ user, url }) => {
      // ...
    },
  },

  // احذف أو عطّل emailVerification section بالكامل
  // emailVerification: {
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  //   sendVerificationEmail: async ({ user, url }) => {
  //     // ...
  //   },
  // },

  // ... rest of config
});
```

#### الخطوة 2: حذف template من `src/lib/email-templates.ts`

```typescript
// احذف هذه الدالة
// export function emailVerificationTemplate(url: string, userName?: string) {
//   // ...
// }
```

---

## 📝 ملاحظات مهمة

### 1️⃣ التبعيات بين الطرق

```
Email & Password
    ├─ Password Reset (يعتمد عليه)
    └─ Email Verification (اختياري)

Google OAuth (مستقل)

Magic Link (مستقل)

Email OTP (مستقل)
```

### 2️⃣ الملفات الأساسية التي لا تُحذف

**لا تحذف هذه الملفات أبداً:**

- `src/lib/db/schema.ts` - Database schema
- `src/lib/db/index.ts` - Database client
- `src/lib/auth.ts` - Auth config (عدّل فقط)
- `src/lib/auth-client.ts` - Auth client (عدّل فقط)
- `src/app/api/auth/[...all]/route.ts` - API handler

### 3️⃣ Email Templates

- يمكنك حذف templates من `src/lib/email-templates.ts` للطرق غير المستخدمة
- إذا لم تستخدم أي طريقة تحتاج email، يمكنك حذف:
  - `src/lib/email.ts`
  - `src/lib/email-templates.ts`

### 4️⃣ Environment Variables

احذف فقط المتغيرات للطرق غير المستخدمة:

```env
# Email & Password - لا يحتاج متغيرات إضافية

# Google OAuth - احذف إذا لم تستخدمه
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Email features - احذف إذا لم تستخدم Magic Link/OTP/Reset/Verification
RESEND_API_KEY="..."
EMAIL_FROM="..."
```

---

## 🎯 Quick Reference - مرجع سريع

### تفعيل/تعطيل سريع

| أريد استخدام           | الخطوات                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------- |
| **Email/Password فقط** | 1. احذف Google OAuth<br>2. احذف Magic Link<br>3. احذف OTP<br>4. احتفظ بـ Password Reset |
| **Google فقط**         | 1. احذف Email/Password<br>2. احذف Magic Link<br>3. احذف OTP<br>4. احذف Password Reset   |
| **Passwordless فقط**   | 1. احذف Email/Password<br>2. احذف Google OAuth<br>3. احتفظ بـ Magic Link و/أو OTP       |
| **كل شيء**             | لا تغيير - كل شيء مُفعّل بالفعل!                                                        |

---

## 🔧 اختبار بعد التعديل

بعد كل تعديل:

```bash
# 1. تأكد من عدم وجود أخطاء
npm run lint

# 2. أعد تشغيل التطبيق
npm run dev

# 3. اختبر الطرق المُفعّلة فقط
http://localhost:3000/sign-in
```

---

## 📚 المزيد

- [Email Service Setup](./EMAIL_SERVICE.md)
- [Authentication Methods Overview](../auth-methods/README.md)
- [Troubleshooting](../troubleshooting/DATABASE_CONNECTION.md)

---

**بالتوفيق! 🚀**
