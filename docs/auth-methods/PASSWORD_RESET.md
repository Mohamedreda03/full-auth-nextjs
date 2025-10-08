# 🔄 Password Reset

Complete guide for password reset functionality.

---

## ✅ Status

**Enabled** - Needs Resend API to work.

---

## 📋 Requirements

- ✅ PostgreSQL database
- ✅ **Email & Password enabled** (depends on it)
- 📧 **Resend API key** (required!)

---

## 🔧 Setup

### 1. Resend API

```env
# In .env.local
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="onboarding@resend.dev"
```

### 2. Configuration in `src/lib/auth.ts`

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

### 3. Client Methods in `src/lib/auth-client.ts`

```typescript
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  forgetPassword, // to request reset
  resetPassword, // to set new password
} = authClient;
```

---

## 🎨 UI (User Interface)

### 1. Forgot Password Page

**File**: `src/app/(auth)/forgot-password/page.tsx`

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

**File**: `src/app/(auth)/reset-password/page.tsx`

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

### 3. Link in Sign-In Page

```typescript
<Link href="/forgot-password">Forgot password?</Link>
```

---

## 🔄 Flow

```
1. User clicks "Forgot password?"
   ↓
2. Enters email in Forgot Password page
   ↓
3. Better Auth generates reset token
   ↓
4. Email sent with Reset link
   ↓
5. User opens email
   ↓
6. Clicks Reset Password link
   ↓
7. Redirected to Reset Password page with token
   ↓
8. Enters new password
   ↓
9. Better Auth updates password
   ↓
10. Redirect to Sign-In
```

---

## 📁 Required Files

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

## 🧪 Testing

```bash
# 1. Make sure Resend API in .env.local
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# 2. Make sure Email & Password is enabled

# 3. Restart application
npm run dev

# 4. Go to sign-in
http://localhost:3000/sign-in

# 5. Click "Forgot password?"

# 6. Enter your email

# 7. Check your email

# 8. Click "Reset Password" link

# 9. Enter new password

# 10. Should succeed
```

---

## ❌ Disable

⚠️ **Warning**: Disabling Password Reset is **not recommended** - this is an essential UX feature!

### If you want to disable it:

### 1. Remove from `src/lib/auth.ts`

```typescript
emailAndPassword: {
  enabled: true,
  requireEmailVerification: true,
  // Remove sendResetPassword
  // sendResetPassword: async ({ user, url }) => {
  //   // ...
  // },
},
```

### 2. Remove Pages

```bash
rm src/app/(auth)/forgot-password/page.tsx
rm src/app/(auth)/reset-password/page.tsx
```

### 3. Remove Link from Sign-In

Remove "Forgot password?" link from `src/app/(auth)/sign-in/page.tsx`

### 4. Remove Methods from `src/lib/auth-client.ts`

```typescript
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  // Remove these
  // forgetPassword,
  // resetPassword,
} = authClient;
```

### 5. Remove Template

Remove `passwordResetTemplate` from `src/lib/email-templates.ts`

---

## 🐛 Common Issues

### 1. Email not arriving

```bash
# Check:
✅ RESEND_API_KEY is correct
✅ EMAIL_FROM verified
✅ Email in Spam folder
✅ terminal logs
✅ User exists in DB
```

### 2. "Invalid or expired token"

```bash
# Reasons:
- Link already used
- Link expired (1 hour by default)
- Request new reset link
```

### 3. "User not found"

```bash
# Solution:
- Check email is registered in DB
- Make sure email is typed correctly
```

---

## ⚙️ Customization

### Custom Redirect after Reset

```typescript
// In forgot-password page
await authClient.forgetPassword({
  email: data.email,
  redirectTo: "/custom-reset-page", // instead of /reset-password
});
```

### Custom Success Redirect

```typescript
// In reset-password page
if (result.success) {
  router.push("/sign-in?reset=success");
}
```

### Custom Email Template

Modify `passwordResetTemplate` in `src/lib/email-templates.ts`

### Password Validation

```typescript
// In reset-password page
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

## 🔒 Security

### Token Security

Better Auth uses:

- ✅ Cryptographically secure tokens
- ✅ One-time use (deleted after use)
- ✅ Expiry time (1 hour by default)
- ✅ Email verification

### Best Practices

✅ **Do**:

- Use strong password requirements
- Send email confirmation after reset
- Log password reset events
- Rate limit reset requests

❌ **Don't**:

- Don't reveal if email exists (security risk)
- Don't make token expiry too long
- Don't allow unlimited reset requests

---

## 📊 UX Tips

### In Forgot Password Page

```typescript
// Instead of "Email not found", use:
"If this email is registered, you'll receive a reset link.";

// This protects privacy (doesn't reveal if email exists)
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

## 📚 More

- [Email & Password Guide](./EMAIL_PASSWORD.md)
- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Better Auth Password Reset](https://www.better-auth.com/docs/authentication/email-password#password-reset)
- [Modular Setup](../guides/MODULAR_SETUP.md#5-password-reset)

---

**Password Reset is a must-have for any app! 🔒**
