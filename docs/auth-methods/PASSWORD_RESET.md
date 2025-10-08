# 🔄 Password Reset

دليل كامل لميزة إعادة تعيين كلمة المرور.

---

## ✅ الحالة

**مُفعّل** - يحتاج Resend API للعمل.

---

## 📋 المتطلبات

- ✅ قاعدة بيانات PostgreSQL
- ✅ **Email & Password مُفعّل** (يعتمد عليه)
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
import { sendEmail } from "./email";
import { passwordResetTemplate } from "./email-templates";

export const auth = betterAuth({
  // ... database config

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
});
```

### 3. Client Methods في `src/lib/auth-client.ts`

```typescript
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  forgetPassword, // لطلب reset
  resetPassword, // لتعيين كلمة مرور جديدة
} = authClient;
```

---

## 🎨 الواجهات (UI)

### 1. Forgot Password Page

**الملف**: `src/app/(auth)/forgot-password/page.tsx`

```typescript
import { authClient } from "@/lib/auth-client";

async function onSubmit(data: { email: string }) {
  const result = await authClient.forgetPassword({
    email: data.email,
    redirectTo: "/reset-password",
  });

  if (result.error) {
    // Handle error
    return;
  }

  // Show success message
  setSuccess(true);
}
```

### 2. Reset Password Page

**الملف**: `src/app/(auth)/reset-password/page.tsx`

```typescript
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const token = searchParams.get("token");

async function onSubmit(data: { password: string }) {
  if (!token) return;

  const result = await authClient.resetPassword({
    newPassword: data.password,
    token,
  });

  if (result.error) {
    // Handle error
    return;
  }

  // Success - redirect to sign-in
  router.push("/sign-in");
}
```

### 3. Link في Sign-In Page

```typescript
<Link href="/forgot-password">Forgot password?</Link>
```

---

## 🔄 التدفق (Flow)

```
1. المستخدم يضغط "Forgot password?"
   ↓
2. يُدخل بريده في Forgot Password page
   ↓
3. Better Auth يُولّد reset token
   ↓
4. Email يُرسل مع Reset link
   ↓
5. المستخدم يفتح بريده
   ↓
6. يضغط Reset Password link
   ↓
7. يُوجّه إلى Reset Password page مع token
   ↓
8. يُدخل كلمة مرور جديدة
   ↓
9. Better Auth يُحدث كلمة المرور
   ↓
10. Redirect إلى Sign-In
```

---

## 📁 الملفات المطلوبة

### Core Files

- ✅ `src/lib/auth.ts` - Server config
- ✅ `src/lib/auth-client.ts` - Client methods
- ✅ `src/lib/email.ts` - Email service
- ✅ `src/lib/email-templates.ts` - Reset template

### UI Files

- ✅ `src/app/(auth)/sign-in/page.tsx` - "Forgot password?" link
- ✅ `src/app/(auth)/forgot-password/page.tsx` - Request reset
- ✅ `src/app/(auth)/reset-password/page.tsx` - Set new password

---

## 🧪 الاختبار

```bash
# 1. تأكد من Resend API في .env.local
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# 2. تأكد من Email & Password مُفعّل

# 3. أعد تشغيل التطبيق
npm run dev

# 4. اذهب إلى sign-in
http://localhost:3000/sign-in

# 5. اضغط "Forgot password?"

# 6. أدخل بريدك

# 7. تحقق من بريدك

# 8. اضغط "Reset Password" link

# 9. أدخل كلمة مرور جديدة

# 10. يجب أن تنجح العملية
```

---

## ❌ التعطيل

⚠️ **تحذير**: تعطيل Password Reset **غير موصى به** - هذه ميزة أساسية للـ UX!

### إذا أردت تعطيله:

### 1. حذف من `src/lib/auth.ts`

```typescript
emailAndPassword: {
  enabled: true,
  requireEmailVerification: true,
  // احذف sendResetPassword
  // sendResetPassword: async ({ user, url }) => {
  //   // ...
  // },
},
```

### 2. حذف الصفحات

```bash
rm src/app/(auth)/forgot-password/page.tsx
rm src/app/(auth)/reset-password/page.tsx
```

### 3. حذف Link من Sign-In

احذف "Forgot password?" link من `src/app/(auth)/sign-in/page.tsx`

### 4. حذف Methods من `src/lib/auth-client.ts`

```typescript
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  // احذف هذه
  // forgetPassword,
  // resetPassword,
} = authClient;
```

### 5. حذف Template

احذف `passwordResetTemplate` من `src/lib/email-templates.ts`

---

## 🐛 المشاكل الشائعة

### 1. Email لا يصل

```bash
# تحقق من:
✅ RESEND_API_KEY صحيح
✅ EMAIL_FROM verified
✅ البريد في Spam folder
✅ terminal logs
✅ المستخدم موجود في DB
```

### 2. "Invalid or expired token"

```bash
# الأسباب:
- الرابط مُستخدم مسبقاً
- الرابط expired (1 ساعة افتراضياً)
- اطلب reset link جديد
```

### 3. "User not found"

```bash
# الحل:
- تحقق من أن البريد مسجل في DB
- تأكد من كتابة البريد بشكل صحيح
```

---

## ⚙️ التخصيص

### Custom Redirect بعد Reset

```typescript
// في forgot-password page
await authClient.forgetPassword({
  email: data.email,
  redirectTo: "/custom-reset-page", // بدل /reset-password
});
```

### Custom Success Redirect

```typescript
// في reset-password page
if (result.success) {
  router.push("/sign-in?reset=success");
}
```

### Custom Email Template

عدّل `passwordResetTemplate` في `src/lib/email-templates.ts`

### Password Validation

```typescript
// في reset-password page
const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase")
      .regex(/[0-9]/, "Must contain number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
```

---

## 🔒 الأمان

### Token Security

Better Auth يستخدم:

- ✅ Cryptographically secure tokens
- ✅ One-time use (يُحذف بعد الاستخدام)
- ✅ Expiry time (1 ساعة افتراضياً)
- ✅ Email verification

### Best Practices

✅ **افعل**:

- استخدم strong password requirements
- أرسل email confirmation بعد reset
- سجّل password reset events
- Rate limit reset requests

❌ **لا تفعل**:

- لا تكشف ما إذا كان البريد موجود (security risk)
- لا تجعل token expiry طويل جداً
- لا تسمح بـ unlimited reset requests

---

## 📊 UX Tips

### في Forgot Password Page

```typescript
// بدل "Email not found"، استخدم:
"If this email is registered, you'll receive a reset link.";

// هذا يحمي الخصوصية (لا يكشف ما إذا كان البريد موجود)
```

### Success Messages

```typescript
// Forgot password success
"✅ Check your email for a password reset link";

// Reset success
"✅ Password reset successful! Redirecting to sign in...";
```

### Error Handling

```typescript
// Token expired
"This reset link has expired. Please request a new one.";

// Invalid token
"Invalid reset link. Please request a new one.";
```

---

## 📚 المزيد

- [Email & Password Guide](./EMAIL_PASSWORD.md)
- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Better Auth Password Reset](https://www.better-auth.com/docs/authentication/email-password#password-reset)
- [Modular Setup](../guides/MODULAR_SETUP.md#5-password-reset)

---

**Password Reset هو must-have لأي تطبيق! 🔒**
