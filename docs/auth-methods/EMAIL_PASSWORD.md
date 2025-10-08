# 📧 Email & Password Authentication

دليل كامل لطريقة المصادقة باستخدام البريد الإلكتروني وكلمة المرور.

---

## ✅ الحالة الحالية

**مُفعّل افتراضياً** - جاهز للاستخدام مباشرة!

---

## 📋 المتطلبات

### الأساسية (Required)

- ✅ قاعدة بيانات PostgreSQL

### الاختيارية (Optional but Recommended)

- 📧 Resend API (لـ Email Verification)
- 🔄 Password Reset (موصى به بشدة)

---

## 🔧 الإعداد

### 1. قاعدة البيانات

يجب أن تكون قد أنشأت الجداول:

```bash
npm run db:push
```

### 2. Configuration في `src/lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  // Email & Password Configuration
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // ⚠️ يحتاج Resend
    sendResetPassword: async ({ user, url }) => {
      // ⚠️ يحتاج Resend
      await sendEmail({
        to: user.email,
        subject: "Reset Your Password",
        html: passwordResetTemplate(url),
      });
    },
  },
});
```

### 3. بدون Email Verification

إذا لم يكن لديك Resend API بعد:

```typescript
emailAndPassword: {
  enabled: true,
  requireEmailVerification: false, // عطّل Email Verification
  // احذف sendResetPassword إذا لم تحتاجه
},
```

---

## 🎨 الواجهات (UI)

### صفحة التسجيل (`src/app/(auth)/sign-up/page.tsx`)

```typescript
import { authClient } from "@/lib/auth-client";

async function onSubmit(data: SignUpFormValues) {
  const result = await authClient.signUp.email({
    email: data.email,
    password: data.password,
    name: data.name,
  });

  if (result.error) {
    // Handle error
    return;
  }

  // Success - redirect or show message
}
```

### صفحة تسجيل الدخول (`src/app/(auth)/sign-in/page.tsx`)

```typescript
import { authClient } from "@/lib/auth-client";

async function onSubmit(data: SignInFormValues) {
  const result = await authClient.signIn.email({
    email: data.email,
    password: data.password,
    callbackURL: "/",
  });

  if (result.error) {
    // Handle error
    return;
  }

  // Success - redirect
}
```

---

## 🔐 الأمان

### Hashing

Better Auth يستخدم **bcrypt** تلقائياً لتشفير كلمات المرور.

### Password Requirements

يمكنك تخصيص متطلبات كلمة المرور:

```typescript
emailAndPassword: {
  enabled: true,
  minPasswordLength: 8,    // الحد الأدنى
  maxPasswordLength: 128,  // الحد الأقصى
  requireEmailVerification: true,
}
```

### في الـ UI (Validation with Zod)

```typescript
const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});
```

---

## ✉️ Email Verification

### التفعيل

```typescript
emailAndPassword: {
  enabled: true,
  requireEmailVerification: true, // المستخدم يجب أن يفعّل بريده
},

emailVerification: {
  sendOnSignUp: true, // أرسل email عند التسجيل
  autoSignInAfterVerification: true, // دخول تلقائي بعد التفعيل
  sendVerificationEmail: async ({ user, url }) => {
    await sendEmail({
      to: user.email,
      subject: "Verify Your Email Address",
      html: emailVerificationTemplate(url, user.name),
    });
  },
},
```

### التدفق (Flow)

1. المستخدم يسجل حساب جديد
2. Better Auth يُرسل email verification
3. المستخدم يضغط الرابط في البريد
4. Better Auth يفعّل الحساب
5. دخول تلقائي (إذا `autoSignInAfterVerification: true`)

---

## 🔄 Password Reset

### التفعيل

```typescript
emailAndPassword: {
  enabled: true,
  sendResetPassword: async ({ user, url }) => {
    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: passwordResetTemplate(url),
    });
  },
},
```

### الواجهات المطلوبة

1. **Forgot Password** (`src/app/(auth)/forgot-password/page.tsx`)

   ```typescript
   await authClient.forgetPassword({
     email: data.email,
     redirectTo: "/reset-password",
   });
   ```

2. **Reset Password** (`src/app/(auth)/reset-password/page.tsx`)
   ```typescript
   await authClient.resetPassword({
     newPassword: data.password,
     token, // من URL query parameter
   });
   ```

---

## 📁 الملفات المتأثرة

### Core Files (Required)

- ✅ `src/lib/auth.ts` - Server configuration
- ✅ `src/lib/auth-client.ts` - Client utilities
- ✅ `src/lib/db/schema.ts` - Database schema

### UI Files (Required)

- ✅ `src/app/(auth)/sign-in/page.tsx` - Sign in page
- ✅ `src/app/(auth)/sign-up/page.tsx` - Sign up page

### UI Files (Optional - for Password Reset)

- ⚠️ `src/app/(auth)/forgot-password/page.tsx`
- ⚠️ `src/app/(auth)/reset-password/page.tsx`

### Email Files (Optional - if using email features)

- 📧 `src/lib/email.ts` - Email service
- 📧 `src/lib/email-templates.ts` - Email templates

---

## 🧪 الاختبار

### 1. التسجيل الأساسي (بدون Email Verification)

```bash
# 1. تأكد من أن DB جاهزة
npm run db:push

# 2. شغّل التطبيق
npm run dev

# 3. افتح
http://localhost:3000/sign-up

# 4. سجل حساب جديد
Email: test@example.com
Password: Test1234
Name: Test User

# 5. يجب أن تنجح العملية
```

### 2. التسجيل مع Email Verification

```bash
# 1. أضف Resend API في .env.local
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# 2. تأكد من requireEmailVerification: true

# 3. سجل حساب جديد

# 4. تحقق من بريدك الإلكتروني

# 5. اضغط رابط التفعيل
```

### 3. Password Reset

```bash
# 1. اذهب إلى sign-in

# 2. اضغط "Forgot password?"

# 3. أدخل بريدك

# 4. تحقق من البريد

# 5. اضغط رابط Reset

# 6. أدخل كلمة مرور جديدة
```

---

## ❌ التعطيل

إذا أردت تعطيل Email & Password تماماً:

### 1. حذف من `src/lib/auth.ts`

```typescript
// احذف أو عطّل
// emailAndPassword: {
//   enabled: true,
//   ...
// },
```

### 2. حذف UI Components

```bash
# احذف password forms من sign-in و sign-up
# أو احذف الصفحات بالكامل إذا لم تستخدم طرق أخرى
```

### 3. حذف Password Reset Pages

```bash
rm src/app/(auth)/forgot-password/page.tsx
rm src/app/(auth)/reset-password/page.tsx
```

---

## 🐛 المشاكل الشائعة

### 1. "Email already exists"

```typescript
// في sign-up handler
if (result.error?.message === "User already exists") {
  setError("This email is already registered. Please sign in.");
}
```

### 2. "Invalid credentials"

```typescript
// في sign-in handler
if (result.error) {
  setError("Invalid email or password");
}
```

### 3. Email Verification لا يُرسل

```typescript
// تأكد من:
// 1. RESEND_API_KEY موجود في .env.local
// 2. requireEmailVerification: true
// 3. sendVerificationEmail function implemented
// 4. check terminal for email logs
```

---

## 📚 المزيد

- [Password Reset Guide](./PASSWORD_RESET.md)
- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Modular Setup](../guides/MODULAR_SETUP.md)
- [Better Auth Docs](https://www.better-auth.com/docs/authentication/email-password)

---

**Email & Password هي الطريقة الأكثر شيوعاً وموثوقية! 🔐**
