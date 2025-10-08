# 🔵 Google OAuth Authentication

Complete guide for setting up Google sign-in.

---

## ✅ Status

**Enabled by default** - Only needs Google credentials to work.

---

## 📋 Requirements

- ✅ PostgreSQL database
- 🔑 Google Cloud credentials

---

## 🔧 Setup

### 1. Get Google OAuth Credentials

#### Step 1: Create Project in Google Cloud

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Project name: `your-app-name-auth`
4. Click "Create"

#### Step 2: Enable OAuth Consent Screen

1. From sidebar: **APIs & Services** → **OAuth consent screen**
2. Choose **External** (for public apps)
3. Click "Create"
4. Fill information:
   - App name: `Your App Name`
   - User support email: your email
   - Developer contact: your email
5. Click "Save and Continue"
6. Scopes: Click "Save and Continue" (use defaults)
7. Test users: Add your email for testing
8. Click "Save and Continue"

#### Step 3: Create OAuth 2.0 Credentials

1. From menu: **APIs & Services** → **Credentials**
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: **Web application**
4. Name: `your-app-oauth-client`
5. **Authorized redirect URIs**:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Click "Create"
7. **Copy**:
   - Client ID
   - Client Secret

### 2. Add Environment Variables

In `.env.local`:

```env
GOOGLE_CLIENT_ID="123456789-xxxxxxxxxxxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxx"
```

### 3. Configuration in `src/lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // ... database config

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
```

---

## 🎨 UI (User Interface)

### In Sign-In Page

```typescript
import { authClient } from "@/lib/auth-client";

async function handleGoogleSignIn() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/", // Where to go after sign-in
  });
}

// In JSX
<Button onClick={handleGoogleSignIn}>
  <GoogleIcon /> Continue with Google
</Button>;
```

### In Sign-Up Page

Same code - Google OAuth works for both sign-in and sign-up!

---

## 🔄 Flow

```
1. User clicks "Continue with Google"
   ↓
2. Better Auth redirects to Google
   ↓
3. User selects Google account
   ↓
4. Google redirects to callback URL
   ↓
5. Better Auth:
   - Creates new account (if not exists)
   - Or signs in (if exists)
   ↓
6. User redirected to callbackURL
```

---

## 📁 Affected Files

### Core Files

- ✅ `src/lib/auth.ts` - Server config
- ✅ `.env.local` - Credentials

### UI Files

- ✅ `src/app/(auth)/sign-in/page.tsx` - Google button
- ✅ `src/app/(auth)/sign-up/page.tsx` - Google button

---

## 🧪 Testing

### Development

```bash
# 1. Make sure credentials are in .env.local
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# 2. Restart application
npm run dev

# 3. Go to
http://localhost:3000/sign-in

# 4. Click "Continue with Google"

# 5. Select Google account

# 6. Should succeed
```

### Production

```bash
# 1. Add production redirect URI in Google Cloud:
https://yourdomain.com/api/auth/callback/google

# 2. Add credentials in Vercel/production env

# 3. Test from production domain
```

---

## ❌ Disable

### Step 1: Remove from `src/lib/auth.ts`

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
});
```

### Step 2: Remove Google Buttons from UI

Remove from `src/app/(auth)/sign-in/page.tsx` and `sign-up/page.tsx`:

```typescript
// Remove this
<Button onClick={handleGoogleSignIn}>
  <GoogleIcon /> Continue with Google
</Button>

// And remove the handler
// async function handleGoogleSignIn() { ... }
```

### Step 3: Remove Environment Variables

```env
# Remove from .env.local
# GOOGLE_CLIENT_ID="..."
# GOOGLE_CLIENT_SECRET="..."
```

---

## 🐛 Common Issues

### 1. "redirect_uri_mismatch"

**Problem**: Redirect URI doesn't match

**Solution**:

```bash
# Make sure redirect URI in Google Cloud exactly matches:
# Development:
http://localhost:3000/api/auth/callback/google

# Production:
https://yourdomain.com/api/auth/callback/google

# ⚠️ No spaces, no trailing slash
```

### 2. "access_denied"

**Problem**: User denied permissions or not added as test user

**Solution**:

```bash
# Add user in Google Cloud:
# OAuth consent screen → Test users → Add users
```

### 3. "invalid_client"

**Problem**: Wrong Client ID or Secret

**Solution**:

```bash
# 1. Check .env.local
# 2. Make sure credentials copied correctly
# 3. No spaces at beginning or end of value
# 4. Restart npm run dev
```

### 4. Works in Development but not Production

**Solution**:

```bash
# 1. Add production redirect URI in Google Cloud
# 2. Make sure environment variables in production
# 3. Check NEXT_PUBLIC_APP_URL
```

---

## 🔒 Security

### Best Practices

✅ **Do**:

- Use HTTPS in production
- Add only correct redirect URIs
- Don't share Client Secret
- Use different credentials for each environment

❌ **Don't**:

- Don't put Client Secret in client-side code
- Don't use same credentials for dev and production
- Don't use `*` wildcards in redirect URIs

---

## 📝 Additional Information

### OAuth Scopes

Better Auth only requests:

- `openid` - User identity
- `email` - Email address
- `profile` - Name and picture

### Data Stored

When using Google OAuth, Better Auth stores:

- Email
- Name
- Profile picture URL
- Google user ID (for linking)

### Account Linking

If user signs up with Email/Password then uses Google with same email:

- ✅ Better Auth links accounts automatically
- ✅ Can sign in with either method

---

## 📚 More

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Better Auth Social Providers](https://www.better-auth.com/docs/authentication/social)
- [Modular Setup](../guides/MODULAR_SETUP.md#2-google-oauth)

---

**Google OAuth is the fastest way to improve user onboarding! 🚀**
