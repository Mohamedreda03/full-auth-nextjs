# 🧩 Modular Authentication Setup

This guide explains **how to enable or disable** each authentication method according to your needs.

---

## 📋 Table of Contents

- [Available Options](#available-options)
- [Common Scenarios](#common-scenarios)
- [Email & Password](#1-email--password)
- [Google OAuth](#2-google-oauth)
- [Magic Link](#3-magic-link)
- [Email OTP](#4-email-otp)
- [Password Reset](#5-password-reset)
- [Email Verification](#6-email-verification)

---

## 🎯 Available Options

| Method                 | Can Disable? | Dependencies      | Affected Files                              |
| ---------------------- | ------------ | ----------------- | ------------------------------------------- |
| **Email & Password**   | ✅ Yes       | Database          | `auth.ts`, `sign-in/up pages`               |
| **Google OAuth**       | ✅ Yes       | Database          | `auth.ts`, `sign-in/up pages`               |
| **Magic Link**         | ✅ Yes       | Database + Resend | `auth.ts`, `auth-client.ts`, `sign-in page` |
| **Email OTP**          | ✅ Yes       | Database + Resend | `auth.ts`, `auth-client.ts`, `sign-in page` |
| **Password Reset**     | ⚠️ Depends\* | Database + Resend | `auth.ts`, `forgot/reset pages`             |
| **Email Verification** | ⚠️ Depends\* | Database + Resend | `auth.ts`                                   |

> **\*** Password Reset depends on Email & Password. Email Verification is optional but recommended.

---

## 🎬 Common Scenarios

### Scenario 1: Email/Password Only

```
✅ Email & Password
❌ Google OAuth
❌ Magic Link
❌ Email OTP
⚠️ Password Reset (recommended)
⚠️ Email Verification (recommended)
```

### Scenario 2: Email/Password + Google

```
✅ Email & Password
✅ Google OAuth
❌ Magic Link
❌ Email OTP
⚠️ Password Reset (recommended)
⚠️ Email Verification (recommended)
```

### Scenario 3: All Methods

```
✅ Email & Password
✅ Google OAuth
✅ Magic Link
✅ Email OTP
✅ Password Reset
✅ Email Verification
```

### Scenario 4: Passwordless Only

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

### ✅ To Enable (enabled by default)

**No changes needed** - this method is already enabled.

### ❌ To Disable

#### Step 1: Disable in `src/lib/auth.ts`

```typescript
export const auth = betterAuth({
  // ... database config
  // Remove or disable this section
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

#### Step 2: Remove UI from `src/app/(auth)/sign-in/page.tsx`

Remove the following section:

```typescript
// Remove this
{
  authMethod === "password" && <Form {...form}>{/* ... password form */}</Form>;
}
```

#### Step 3: Remove UI from `src/app/(auth)/sign-up/page.tsx`

Remove the entire password form.

#### Step 4: Remove the following pages (if not using Password Reset)

```bash
rm src/app/(auth)/forgot-password/page.tsx
rm src/app/(auth)/reset-password/page.tsx
```

---

## 2. Google OAuth

### ✅ To Enable (enabled by default)

#### Requirements:

```env
# In .env.local
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

**Setup**:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Add credentials in `.env.local`

### ❌ To Disable

#### Step 1: Disable in `src/lib/auth.ts`

```typescript
export const auth = betterAuth({
  // ... database config
  // Remove this section
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID || "",
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  //   },
  // },
  // ... rest of config
});
```

#### Step 2: Remove UI from `src/app/(auth)/sign-in/page.tsx`

Remove:

```typescript
// Remove Google Sign In button
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

#### Step 3: Remove UI from `src/app/(auth)/sign-up/page.tsx`

Remove the same Google button.

#### Step 4: Remove variables from `.env.local`

```env
# Remove these
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...
```

---

## 3. Magic Link

### ✅ To Enable (enabled by default)

#### Requirements:

```env
# In .env.local
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="onboarding@resend.dev"
```

**Setup**: Read [Email Service Guide](./EMAIL_SERVICE.md)

### ❌ To Disable

#### Step 1: Remove plugin from `src/lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
// Remove this
// import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  // ... database config

  plugins: [
    // Remove magicLink from plugins
    // magicLink({
    //   sendMagicLink: async ({ email, url }) => {
    //     // ...
    //   },
    // }),

    // Keep emailOTP if you're using it
    emailOTP({
      // ...
    }),
  ],
});
```

#### Step 2: Remove plugin from `src/lib/auth-client.ts`

```typescript
"use client";

import { createAuthClient } from "better-auth/react";
// Remove this
// import { magicLinkClient } from "better-auth/client/plugins";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    // Remove magicLinkClient
    // magicLinkClient(),
    emailOTPClient(),
  ],
});
```

#### Step 3: Remove UI from `src/app/(auth)/sign-in/page.tsx`

Remove:

```typescript
// 1. Remove from tabs
<button
  type="button"
  onClick={() => setAuthMethod("magic")}
  // ...
>
  Magic Link
</button>

// 2. Remove Magic Link form
{authMethod === "magic" && (
  // ... remove all Magic Link content
)}
```

#### Step 4: Remove template from `src/lib/email-templates.ts`

```typescript
// Remove this function
// export function magicLinkTemplate(url: string) {
//   // ...
// }
```

---

## 4. Email OTP

### ✅ To Enable (enabled by default)

#### Requirements:

```env
# In .env.local
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="onboarding@resend.dev"
```

**Setup**: Read [Email Service Guide](./EMAIL_SERVICE.md)

### ❌ To Disable

#### Step 1: Remove plugin from `src/lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
// Remove this
// import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  // ... database config

  plugins: [
    magicLink({
      // Keep magicLink if you're using it
    }),

    // Remove emailOTP
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

#### Step 2: Remove plugin from `src/lib/auth-client.ts`

```typescript
"use client";

import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
// Remove this
// import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    magicLinkClient(),
    // Remove emailOTPClient
    // emailOTPClient(),
  ],
});
```

#### Step 3: Remove UI from `src/app/(auth)/sign-in/page.tsx`

Remove:

```typescript
// 1. Remove from tabs
<button
  type="button"
  onClick={() => setAuthMethod("otp")}
  // ...
>
  OTP
</button>

// 2. Remove OTP form
{authMethod === "otp" && (
  // ... remove all OTP content
)}
```

#### Step 4: Remove template from `src/lib/email-templates.ts`

```typescript
// Remove this function
// export function otpTemplate(otp: string, type: string) {
//   // ...
// }
```

---

## 5. Password Reset

### ✅ To Enable (enabled by default)

#### Requirements:

- Email & Password must be enabled
- Resend API

```env
# In .env.local
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="onboarding@resend.dev"
```

### ❌ To Disable

#### Step 1: Remove from `src/lib/auth.ts`

```typescript
export const auth = betterAuth({
  // ... database config

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // Remove sendResetPassword
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

#### Step 2: Remove Pages

```bash
rm src/app/(auth)/forgot-password/page.tsx
rm src/app/(auth)/reset-password/page.tsx
```

#### Step 3: Remove Link from `src/app/(auth)/sign-in/page.tsx`

```typescript
// Remove this
{
  /* <div className="text-sm">
  <Link href="/forgot-password" ...>
    Forgot password?
  </Link>
</div> */
}
```

#### Step 4: Remove template from `src/lib/email-templates.ts`

```typescript
// Remove this function
// export function passwordResetTemplate(url: string) {
//   // ...
// }
```

#### Step 5: Remove exports from `src/lib/auth-client.ts`

```typescript
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  // Remove these
  // forgetPassword,
  // resetPassword,
  sendVerificationEmail,
} = authClient;
```

---

## 6. Email Verification

### ✅ To Enable (enabled by default)

#### Requirements:

- Email & Password must be enabled
- Resend API

```env
# In .env.local
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="onboarding@resend.dev"
```

### ❌ To Disable (not recommended)

#### Step 1: Disable in `src/lib/auth.ts`

```typescript
export const auth = betterAuth({
  // ... database config

  emailAndPassword: {
    enabled: true,
    // Change to false
    requireEmailVerification: false, // ⚠️ Not recommended
    sendResetPassword: async ({ user, url }) => {
      // ...
    },
  },

  // Remove or disable emailVerification section entirely
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

#### Step 2: Remove template from `src/lib/email-templates.ts`

```typescript
// Remove this function
// export function emailVerificationTemplate(url: string, userName?: string) {
//   // ...
// }
```

---

## 📝 Important Notes

### 1️⃣ Dependencies Between Methods

```
Email & Password
    ├─ Password Reset (depends on it)
    └─ Email Verification (optional)

Google OAuth (independent)

Magic Link (independent)

Email OTP (independent)
```

### 2️⃣ Core Files That Should Not Be Deleted

**Never delete these files**:

- `src/lib/db/schema.ts` - Database schema
- `src/lib/db/index.ts` - Database client
- `src/lib/auth.ts` - Auth config (modify only)
- `src/lib/auth-client.ts` - Auth client (modify only)
- `src/app/api/auth/[...all]/route.ts` - API handler

### 3️⃣ Email Templates

- You can delete templates from `src/lib/email-templates.ts` for unused methods
- If you don't use any method that requires email, you can delete:
  - `src/lib/email.ts`
  - `src/lib/email-templates.ts`

### 4️⃣ Environment Variables

Only delete variables for unused methods:

```env
# Email & Password - doesn't need additional variables

# Google OAuth - remove if not using
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Email features - remove if not using Magic Link/OTP/Reset/Verification
RESEND_API_KEY="..."
EMAIL_FROM="..."
```

---

## 🎯 Quick Reference

### Quick Enable/Disable

| I want to use           | Steps                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| **Email/Password only** | 1. Remove Google OAuth<br>2. Remove Magic Link<br>3. Remove OTP<br>4. Keep Password Reset     |
| **Google only**         | 1. Remove Email/Password<br>2. Remove Magic Link<br>3. Remove OTP<br>4. Remove Password Reset |
| **Passwordless only**   | 1. Remove Email/Password<br>2. Remove Google OAuth<br>3. Keep Magic Link and/or OTP           |
| **Everything**          | No changes - everything is already enabled!                                                   |

---

## 🔧 Test After Changes

After each change:

```bash
# 1. Make sure no errors
npm run lint

# 2. Restart the app
npm run dev

# 3. Test only enabled methods
http://localhost:3000/sign-in
```

---

## 📚 More

- [Email Service Setup](./EMAIL_SERVICE.md)
- [Authentication Methods Overview](../auth-methods/README.md)
- [Troubleshooting](../troubleshooting/DATABASE_CONNECTION.md)

---

**Good luck! 🚀**
