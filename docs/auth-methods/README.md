# 🔐 Authentication Methods Overview

Overview of all available authentication methods in the application.

---

## 📚 Available Methods

### 1. [Email & Password](./EMAIL_PASSWORD.md)

**Status**: ✅ Enabled by default

Traditional authentication method using email and password.

**Features**:

- ✅ Simple and familiar
- ✅ No external services needed (for basic registration)
- ✅ Works offline (after registration)

**Requirements**:

- PostgreSQL database
- Resend API (for email verification only)

---

### 2. [Google OAuth](./GOOGLE_OAUTH.md)

**Status**: ✅ Enabled by default

One-click sign-in using Google account.

**Features**:

- ✅ Fast user experience
- ✅ No password management needed
- ✅ Reliable and secure

**Requirements**:

- PostgreSQL database
- Google Cloud credentials

---

### 3. [Magic Link](./MAGIC_LINK.md)

**Status**: ⚠️ Needs Resend API

Passwordless sign-in via link sent to email.

**Features**:

- ✅ No password to remember
- ✅ Secure and easy to use
- ✅ Perfect for rarely used apps

**Requirements**:

- PostgreSQL database
- Resend API key

---

### 4. [Email OTP](./EMAIL_OTP.md)

**Status**: ⚠️ Needs Resend API

Sign-in using one-time code (6 digits) sent to email.

**Features**:

- ✅ High security
- ✅ Familiar experience (like banking apps)
- ✅ No password to remember

**Requirements**:

- PostgreSQL database
- Resend API key

---

### 5. [Password Reset](./PASSWORD_RESET.md)

**Status**: ⚠️ Needs Resend API

Password reset for users who forgot their password.

**Features**:

- ✅ Essential for better user experience
- ✅ Secure (uses time-limited tokens)

**Requirements**:

- Email & Password enabled
- PostgreSQL database
- Resend API key

---

### 6. [Admin Roles & Permissions](./ADMIN_ROLES.md)

**Status**: ✅ Enabled

Advanced role and permission system for user management.

**Features**:

- ✅ Flexible role system (Admin, User)
- ✅ Ban/unban users
- ✅ Complete user management
- ✅ Extensible for custom roles

**Requirements**:

- PostgreSQL database
- Better Auth enabled

---

## 🔄 Relationships Between Methods

```
┌─────────────────────┐
│  Email & Password   │ ◄─┐
└─────────────────────┘   │
          │               │ depends on
          ├─ Password Reset
          └─ Email Verification (optional)

┌─────────────────────┐
│   Google OAuth      │ (independent)
└─────────────────────┘

┌─────────────────────┐
│    Magic Link       │ (independent)
└─────────────────────┘

┌─────────────────────┐
│    Email OTP        │ (independent)
└─────────────────────┘
```

---

## 📊 Comparison Table

| Method             | Ease of Use | Security   | Needs Email Service | Needs Third-party |
| ------------------ | ----------- | ---------- | ------------------- | ----------------- |
| **Email/Password** | ⭐⭐⭐      | ⭐⭐⭐⭐   | ⚠️ For verification | ❌ No             |
| **Google OAuth**   | ⭐⭐⭐⭐⭐  | ⭐⭐⭐⭐⭐ | ❌ No               | ✅ Google         |
| **Magic Link**     | ⭐⭐⭐⭐    | ⭐⭐⭐⭐   | ✅ Yes              | ❌ No             |
| **Email OTP**      | ⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐ | ✅ Yes              | ❌ No             |

---

## 🎯 When to Use Each Method?

### Use Email & Password when:

- ✅ You want a traditional and familiar method
- ✅ You don't want to depend on external services (initially)
- ✅ You're targeting technical users

### Use Google OAuth when:

- ✅ You want fast onboarding
- ✅ You're targeting non-technical users
- ✅ You want to reduce sign-up friction

### Use Magic Link when:

- ✅ The app is used infrequently
- ✅ You want to improve UX
- ✅ Security is more important than speed

### Use Email OTP when:

- ✅ You need high security (like financial apps)
- ✅ Users are familiar with OTPs
- ✅ You want built-in 2FA

---

## 🚀 Quick Start

For a quick overview of what works now, read:

- [Quick Start Guide](../QUICK_START.md)

To learn how to enable/disable each method:

- [Modular Setup Guide](../guides/MODULAR_SETUP.md) ⭐ **Recommended**

---

## 📚 Useful Links

- [Better Auth Documentation](https://www.better-auth.com)
- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Environment Variables](../setup/env.example)
- [Troubleshooting](../troubleshooting/DATABASE_CONNECTION.md)
