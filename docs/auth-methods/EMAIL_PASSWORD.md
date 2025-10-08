# 📧 Email & Password Authentication

Complete guide for authentication using email and password.

---

## ✅ Current Status

**Enabled by default** - Ready to use immediately!

---

## 📋 Requirements

### Required

- ✅ PostgreSQL database

### Optional but Recommended

- 📧 Resend API (for Email Verification)
- 🔄 Password Reset (highly recommended)

---

## 🔧 Setup

### 1. Database

You should have already created the tables:

```bash
npm run db:push
```

### 2. Configuration in `src/lib/auth.ts`

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
    requireEmailVerification: true, // ⚠️ Needs Resend
    sendResetPassword: async ({ user, url }) => {
      // ⚠️ Needs Resend
      await sendEmail({
        to: user.email,
        subject: "Reset Your Password",
        html: passwordResetTemplate(url),
      });
    },
  },
});
```

### 3. Without Email Verification

If you don't have Resend API yet:

```typescript
emailAndPassword: {
  enabled: true,
  requireEmailVerification: false, // Disable Email Verification
  // Remove sendResetPassword if you don't need it
},
```

---

## 🎨 UI (User Interface)

### Sign Up Page (`src/app/(auth)/sign-up/page.tsx`)

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

### Sign In Page (`src/app/(auth)/sign-in/page.tsx`)

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

## 🔐 Security

### Hashing

Better Auth uses **bcrypt** automatically for password encryption.

### Password Requirements

You can customize password requirements:

```typescript
emailAndPassword: {
  enabled: true,
  minPasswordLength: 8,    // Minimum
  maxPasswordLength: 128,  // Maximum
  requireEmailVerification: true,
}
```

### In UI (Validation with Zod)

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

### Enable

```typescript
emailAndPassword: {
  enabled: true,
  requireEmailVerification: true, // User must verify email
},

emailVerification: {
  sendOnSignUp: true, // Send email on signup
  autoSignInAfterVerification: true, // Auto sign-in after verification
  sendVerificationEmail: async ({ user, url }) => {
    await sendEmail({
      to: user.email,
      subject: "Verify Your Email Address",
      html: emailVerificationTemplate(url, user.name),
    });
  },
},
```

### Flow

1. User creates new account
2. Better Auth sends email verification
3. User clicks link in email
4. Better Auth activates account
5. Auto sign-in (if `autoSignInAfterVerification: true`)

---

## 🔄 Password Reset

### Enable

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

### Required UI

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
     token, // From URL query parameter
   });
   ```

---

## 📁 Affected Files

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

## 🧪 Testing

### 1. Basic Registration (without Email Verification)

```bash
# 1. Make sure DB is ready
npm run db:push

# 2. Run application
npm run dev

# 3. Open
http://localhost:3000/sign-up

# 4. Create new account
Email: test@example.com
Password: Test1234
Name: Test User

# 5. Should succeed
```

### 2. Registration with Email Verification

```bash
# 1. Add Resend API in .env.local
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# 2. Make sure requireEmailVerification: true

# 3. Create new account

# 4. Check your email

# 5. Click verification link
```

### 3. Password Reset

```bash
# 1. Go to sign-in

# 2. Click "Forgot password?"

# 3. Enter your email

# 4. Check your email

# 5. Click Reset link

# 6. Enter new password
```

---

## ❌ Disable

If you want to completely disable Email & Password:

### 1. Remove from `src/lib/auth.ts`

```typescript
// Remove or disable
// emailAndPassword: {
//   enabled: true,
//   ...
// },
```

### 2. Remove UI Components

```bash
# Remove password forms from sign-in and sign-up
# Or remove pages entirely if not using other methods
```

### 3. Remove Password Reset Pages

```bash
rm src/app/(auth)/forgot-password/page.tsx
rm src/app/(auth)/reset-password/page.tsx
```

---

## 🐛 Common Issues

### 1. "Email already exists"

```typescript
// In sign-up handler
if (result.error?.message === "User already exists") {
  setError("This email is already registered. Please sign in.");
}
```

### 2. "Invalid credentials"

```typescript
// In sign-in handler
if (result.error) {
  setError("Invalid email or password");
}
```

### 3. Email Verification not sending

```typescript
// Make sure:
// 1. RESEND_API_KEY exists in .env.local
// 2. requireEmailVerification: true
// 3. sendVerificationEmail function implemented
// 4. check terminal for email logs
```

---

## 📚 More

- [Password Reset Guide](./PASSWORD_RESET.md)
- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Modular Setup](../guides/MODULAR_SETUP.md)
- [Better Auth Docs](https://www.better-auth.com/docs/authentication/email-password)

---

**Email & Password is the most common and reliable method! 🔐**
