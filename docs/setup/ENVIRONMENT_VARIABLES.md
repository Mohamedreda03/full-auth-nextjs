# 🔑 Environment Variables Guide

Complete guide for all required environment variables in the project.

---

## 📋 Table of Contents

- [Required File](#required-file)
- [Required Variables](#required-variables)
- [Optional Variables](#optional-variables)
- [Examples by Scenario](#examples-by-scenario)

---

## 📁 Required File

Create `.env.local` file in the root directory:

```bash
# In project root directory
touch .env.local

# Or on Windows
type nul > .env.local
```

⚠️ **Important**: `.env.local` is automatically added to `.gitignore` - **don't add it to Git!**

---

## 🔴 Required Variables

These variables are **required** for the app to work:

### 1. Database Connection

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

**Real example**:

```env
# Local PostgreSQL
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/nextjs_auth"

# PostgreSQL on Vercel/Supabase
DATABASE_URL="postgresql://user:pass@db.xxx.supabase.co:5432/postgres"

# PostgreSQL with SSL
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

**How to get it**:

1. **Locally**: Use your local PostgreSQL data
2. **Supabase**: Project Settings → Database → Connection String
3. **Vercel**: Storage → Postgres → Connection String
4. **Railway**: Database → Connect → Connection String

### 2. App URL

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**In Production**:

```env
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

⚠️ **Don't forget** `NEXT_PUBLIC_` prefix - this makes the variable available in client!

---

## 🟡 Optional Variables

### 1. Google OAuth (Optional)

```env
GOOGLE_CLIENT_ID="123456789-xxxxxxxxxxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxxxx"
```

**When you need it**: If you're using Google Sign-In

**How to get it**:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. APIs & Services → Credentials
4. Create Credentials → OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`

**Complete guide**: [Google OAuth Guide](../auth-methods/GOOGLE_OAUTH.md)

### 2. Resend API (for Email Features)

```env
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="onboarding@resend.dev"
```

**When you need it**: If you're using:

- ✉️ Email Verification
- 🔄 Password Reset
- ✨ Magic Link
- 🔢 Email OTP

**How to get it**:

1. Sign up at [Resend](https://resend.com) (free - 100 emails/day)
2. Go to API Keys
3. Create API Key
4. Copy the key

**EMAIL_FROM Options**:

```env
# Test domain from Resend (for local development)
EMAIL_FROM="onboarding@resend.dev"

# Your own domain (in Production)
EMAIL_FROM="noreply@yourdomain.com"
```

**Complete guide**: [Email Service Guide](../guides/EMAIL_SERVICE.md)

### 3. Better Auth (Optional in Development)

```env
BETTER_AUTH_SECRET="your-random-secret-key-minimum-32-characters-long"
BETTER_AUTH_URL="http://localhost:3000"
```

**When you need it**:

- ⚠️ **Required in Production**
- ✅ Optional in Development (Better Auth generates one automatically)

**How to generate it**:

```bash
# In terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or
openssl rand -hex 32
```

---

## 🎯 Examples by Scenario

### Scenario 1: Email/Password Only (without Email Verification)

```env
# Basics
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs_auth"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Not needed:
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - RESEND_API_KEY
# - EMAIL_FROM
```

### Scenario 2: Email/Password + Google OAuth

```env
# Basics
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs_auth"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="123456789-xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxx"

# Resend not needed if not using email features
```

### Scenario 3: Email/Password + Email Verification

```env
# Basics
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs_auth"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email Service (required)
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="onboarding@resend.dev"
```

### Scenario 4: All Features

```env
# Basics
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs_auth"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="123456789-xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxx"

# Email Service
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="onboarding@resend.dev"

# Optional in Development
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
```

### Scenario 5: Production Setup

```env
# Basics
DATABASE_URL="postgresql://user:pass@production-db.com:5432/db?sslmode=require"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Google OAuth
GOOGLE_CLIENT_ID="123456789-xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxx"

# Email Service
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"

# Required in Production!
BETTER_AUTH_SECRET="your-super-secret-key-minimum-32-characters"
BETTER_AUTH_URL="https://yourdomain.com"
```

---

## ✅ Verify Setup

After creating `.env.local`, make sure it works:

```typescript
// Create test file in root: test-env.mjs
console.log(
  "Database URL:",
  process.env.DATABASE_URL ? "✅ Set" : "❌ Missing"
);
console.log("App URL:", process.env.NEXT_PUBLIC_APP_URL || "❌ Missing");
console.log(
  "Google ID:",
  process.env.GOOGLE_CLIENT_ID ? "✅ Set" : "⚠️ Optional"
);
console.log(
  "Resend API:",
  process.env.RESEND_API_KEY ? "✅ Set" : "⚠️ Optional"
);
```

```bash
# Run it
node test-env.mjs

# Then delete it
rm test-env.mjs
```

---

## 🔒 Security

### ✅ Do:

- ✅ Add `.env.local` to `.gitignore`
- ✅ Use different secrets for each environment
- ✅ Use `.env.example` as template for team
- ✅ Use environment variables in CI/CD

### ❌ Don't:

- ❌ **Never** add `.env.local` to Git
- ❌ **Never** share secrets in conversations or Screenshots
- ❌ Don't use same DATABASE_URL for Development and Production
- ❌ Don't use weak secrets in Production

---

## 🔄 Restart After Changes

After changing `.env.local`, restart the app:

```bash
# Stop the app (Ctrl+C)

# Then run it again
npm run dev
```

---

## 📁 Template File

There's a `docs/setup/env.example` file with complete template:

```bash
# Copy it to .env.local
cp docs/setup/env.example .env.local

# Then modify values according to your needs
```

---

## 🐛 Common Issues

### 1. "DATABASE_URL is not set"

```bash
# Make sure:
# 1. File is named .env.local (not .env or env.local)
# 2. File is in root directory
# 3. No spaces around =
# 4. Restart npm run dev
```

### 2. "Invalid connection string"

```bash
# Make sure Format:
postgresql://username:password@host:port/database

# Correct example:
DATABASE_URL="postgresql://postgres:mypass123@localhost:5432/mydb"
```

### 3. NEXT*PUBLIC* variables not working

```bash
# Make sure:
# 1. Variable name starts with NEXT_PUBLIC_
# 2. Restart npm run dev
# 3. In client components only
```

### 4. Resend emails not sending

```bash
# Make sure:
# 1. RESEND_API_KEY is correct
# 2. EMAIL_FROM domain verified (or use onboarding@resend.dev)
# 3. Check terminal for logs
```

---

## 📚 More

- [Example Template](./env.example)
- [Database Setup](./DATABASE_SETUP.md)
- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Troubleshooting](../troubleshooting/DATABASE_CONNECTION.md)

---

**Environment Variables are the foundation of security and configuration! 🔑**
