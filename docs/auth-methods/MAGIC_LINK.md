# ✨ Magic Link Authentication

Complete guide for passwordless sign-in via Magic Link.

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

📖 **Complete guide**: [Email Service Guide](../guides/EMAIL_SERVICE.md)

### 2. Configuration in `src/lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { sendEmail } from "./email";
import { magicLinkTemplate } from "./email-templates";

export const auth = betterAuth({
  // ... database config

  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmail({
          to: email,
          subject: "✨ Your Magic Sign-In Link",
          html: magicLinkTemplate(url),
        });
      },
    }),
  ],
});
```

### 3. Client Plugin in `src/lib/auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [magicLinkClient()],
});
```

---

## 🎨 UI (User Interface)

### In Sign-In Page

```typescript
import { authClient } from "@/lib/auth-client";

const [magicLinkSent, setMagicLinkSent] = useState(false);

async function handleMagicLink(data: { email: string }) {
  const result = await authClient.signIn.magicLink({
    email: data.email,
    callbackURL: "/",
  });

  if (result.error) {
    // Handle error
    return;
  }

  setMagicLinkSent(true);
}
```

---

## 🔄 Flow

```
1. User enters email
   ↓
2. Better Auth generates magic link token
   ↓
3. Email sent via Resend
   ↓
4. User opens email
   ↓
5. Clicks Magic Link
   ↓
6. Better Auth verifies token
   ↓
7. Automatic sign-in
   ↓
8. Redirect to callbackURL
```

---

## 📁 Required Files

### Core Files

- ✅ `src/lib/auth.ts` - Server config with plugin
- ✅ `src/lib/auth-client.ts` - Client plugin
- ✅ `src/lib/email.ts` - Email service
- ✅ `src/lib/email-templates.ts` - Magic link template

### UI Files

- ✅ `src/app/(auth)/sign-in/page.tsx` - Magic link tab

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

# 4. Choose "Magic Link" tab

# 5. Enter your email

# 6. Check your email (check Spam!)

# 7. Click the link

# 8. Should sign in automatically
```

---

## ❌ Disable

### 1. Remove from `src/lib/auth.ts`

```typescript
// Remove import
// import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    // Remove from plugins array
    // magicLink({ ... }),
  ],
});
```

### 2. Remove from `src/lib/auth-client.ts`

```typescript
// Remove import
// import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    // Remove from plugins
    // magicLinkClient(),
  ],
});
```

### 3. Remove UI Tab

Remove Magic Link tab from `src/app/(auth)/sign-in/page.tsx`

### 4. Remove Template

Remove `magicLinkTemplate` from `src/lib/email-templates.ts`

---

## 🐛 Common Issues

### 1. Email not arriving

```bash
# Check:
✅ RESEND_API_KEY is correct
✅ EMAIL_FROM verified (or use onboarding@resend.dev)
✅ Check Spam folder
✅ Check terminal logs
```

### 2. "Invalid or expired magic link"

```bash
# Reasons:
- Link already used (Magic links are one-time use)
- Link expired (15 minutes by default)
- Request a new magic link
```

### 3. Works in Development but not Production

```bash
# Make sure:
✅ RESEND_API_KEY in production environment
✅ NEXT_PUBLIC_APP_URL is correct
✅ EMAIL_FROM domain verified in production
```

---

## ⚙️ Customization

### Change Expiry Time

```typescript
magicLink({
  sendMagicLink: async ({ email, url }) => { ... },
  expiresIn: 900, // 15 minutes (default)
  // expiresIn: 600, // 10 minutes
  // expiresIn: 1800, // 30 minutes
}),
```

### Custom Redirect after Sign-In

```typescript
// In UI
await authClient.signIn.magicLink({
  email: data.email,
  callbackURL: "/dashboard", // instead of /
});
```

### Custom Email Template

Modify `magicLinkTemplate` in `src/lib/email-templates.ts`

---

## 📚 More

- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Better Auth Magic Link Docs](https://www.better-auth.com/docs/plugins/magic-link)
- [Modular Setup](../guides/MODULAR_SETUP.md#3-magic-link)

---

**Magic Link = Security + Ease of Use! ✨**
