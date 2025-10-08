# 🔢 Email OTP Authentication

Complete guide for sign-in using OTP (One-Time Password).

---

## ✅ Status

**Enabled** - Needs Resend API to work.

---

## 📋 Requirements

- ✅ PostgreSQL database
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
      otpLength: 6, // Code length
      expiresIn: 600, // 10 minutes
      allowedAttempts: 3, // Number of allowed attempts
      overrideDefaultEmailVerification: false,
    }),
  ],
});
```

### 3. Client Plugin in `src/lib/auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [emailOTPClient()],
});
```

---

## 🎨 UI (User Interface)

### In Sign-In Page

```typescript
import { authClient } from "@/lib/auth-client";

const [otpSent, setOtpSent] = useState(false);
const [email, setEmail] = useState("");

// Step 1: Send OTP
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

// Step 2: Verify OTP
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

## 🔄 Flow

```
1. User enters email
   ↓
2. Better Auth generates 6-digit OTP
   ↓
3. Email sent via Resend
   ↓
4. User opens email
   ↓
5. Copies the OTP
   ↓
6. Enters OTP in app
   ↓
7. Better Auth verifies OTP
   ↓
8. Automatic sign-in
```

---

## 📁 Required Files

### Core Files

- ✅ `src/lib/auth.ts` - Server config with plugin
- ✅ `src/lib/auth-client.ts` - Client plugin
- ✅ `src/lib/email.ts` - Email service
- ✅ `src/lib/email-templates.ts` - OTP template

### UI Files

- ✅ `src/app/(auth)/sign-in/page.tsx` - OTP tab with 2 steps

---

## 🧪 Testing

```bash
# 1. Make sure Resend API in .env.local
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# 2. Restart application
npm run dev

# 3. Go to sign-in
http://localhost:3000/sign-in

# 4. Choose "OTP" tab

# 5. Enter your email

# 6. Check your email

# 7. Enter the 6-digit code

# 8. Should sign in automatically
```

---

## ❌ Disable

### 1. Remove from `src/lib/auth.ts`

```typescript
// Remove import
// import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    // Remove from plugins array
    // emailOTP({ ... }),
  ],
});
```

### 2. Remove from `src/lib/auth-client.ts`

```typescript
// Remove import
// import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    // Remove from plugins
    // emailOTPClient(),
  ],
});
```

### 3. Remove UI Tab

Remove OTP tab from `src/app/(auth)/sign-in/page.tsx`

### 4. Remove Template

Remove `otpTemplate` from `src/lib/email-templates.ts`

---

## 🐛 Common Issues

### 1. Email not arriving

```bash
# Check:
✅ RESEND_API_KEY is correct
✅ EMAIL_FROM verified
✅ Check Spam folder
✅ Check terminal logs
```

### 2. "Invalid OTP"

```bash
# Reasons:
- Wrong code (double-check)
- Code expired (10 minutes by default)
- Exceeded attempts (3 by default)
- Request new OTP
```

### 3. "Too many attempts"

```bash
# Solution:
- Wait a bit
- Request new OTP
- Or increase allowedAttempts in config
```

---

## ⚙️ Customization

### Change Code Length

```typescript
emailOTP({
  otpLength: 6,     // default
  // otpLength: 4,  // shorter
  // otpLength: 8,  // longer
}),
```

### Change Expiry Time

```typescript
emailOTP({
  expiresIn: 600,    // 10 minutes (default)
  // expiresIn: 300, // 5 minutes
  // expiresIn: 900, // 15 minutes
}),
```

### Change Attempts

```typescript
emailOTP({
  allowedAttempts: 3,  // default
  // allowedAttempts: 5,
}),
```

### Use OTP for Email Verification

```typescript
emailOTP({
  overrideDefaultEmailVerification: true, // Use OTP instead of Link
}),
```

---

## 🎯 Use Cases

### When to use OTP?

✅ **Use it when**:

- You need high security (like banking apps)
- Users are familiar with OTPs
- You want built-in 2FA
- You want faster UX than Magic Link (no need to go to email and back)

❌ **Don't use it when**:

- Users are not tech-savvy
- Email is slow to arrive
- You want passwordless without friction

---

## 🔒 Security

### Best Practices

✅ **Do**:

- Use sufficient OTP length (6 digits)
- Limit attempts
- Use short expiry time
- Rate limit OTP requests

❌ **Don't**:

- Don't use very long OTP (bad UX)
- Don't make expiry too long
- Don't allow unlimited attempts

---

## 📚 More

- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Better Auth Email OTP Docs](https://www.better-auth.com/docs/plugins/email-otp)
- [Modular Setup](../guides/MODULAR_SETUP.md#4-email-otp)

---

**OTP = High Security + Familiar Experience! 🔢**
