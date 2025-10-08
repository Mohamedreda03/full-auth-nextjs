# 🔵 Google OAuth Authentication

دليل كامل لإعداد تسجيل الدخول باستخدام Google.

---

## ✅ الحالة

**مُفعّل افتراضياً** - يحتاج فقط Google credentials للعمل.

---

## 📋 المتطلبات

- ✅ قاعدة بيانات PostgreSQL
- 🔑 Google Cloud credentials

---

## 🔧 الإعداد

### 1. الحصول على Google OAuth Credentials

#### الخطوة 1: إنشاء Project في Google Cloud

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. اضغط "Select a project" → "New Project"
3. اسم المشروع: `your-app-name-auth`
4. اضغط "Create"

#### الخطوة 2: تفعيل OAuth Consent Screen

1. من القائمة الجانبية: **APIs & Services** → **OAuth consent screen**
2. اختر **External** (للتطبيقات العامة)
3. اضغط "Create"
4. املأ المعلومات:
   - App name: `Your App Name`
   - User support email: بريدك
   - Developer contact: بريدك
5. اضغط "Save and Continue"
6. Scopes: اضغط "Save and Continue" (استخدم defaults)
7. Test users: أضف بريدك للاختبار
8. اضغط "Save and Continue"

#### الخطوة 3: إنشاء OAuth 2.0 Credentials

1. من القائمة: **APIs & Services** → **Credentials**
2. اضغط "Create Credentials" → "OAuth client ID"
3. Application type: **Web application**
4. Name: `your-app-oauth-client`
5. **Authorized redirect URIs**:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. اضغط "Create"
7. **انسخ**:
   - Client ID
   - Client Secret

### 2. إضافة Environment Variables

في `.env.local`:

```env
GOOGLE_CLIENT_ID="123456789-xxxxxxxxxxxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxx"
```

### 3. Configuration في `src/lib/auth.ts`

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

## 🎨 الواجهة (UI)

### في Sign-In Page

```typescript
import { authClient } from "@/lib/auth-client";

async function handleGoogleSignIn() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/", // أين يذهب بعد تسجيل الدخول
  });
}

// في JSX
<Button onClick={handleGoogleSignIn}>
  <GoogleIcon /> Continue with Google
</Button>;
```

### في Sign-Up Page

نفس الكود - Google OAuth يعمل للـ sign-in و sign-up معاً!

---

## 🔄 التدفق (Flow)

```
1. المستخدم يضغط "Continue with Google"
   ↓
2. Better Auth يوجهه إلى Google
   ↓
3. المستخدم يختار حساب Google
   ↓
4. Google يوجهه إلى callback URL
   ↓
5. Better Auth:
   - ينشئ حساب جديد (إذا لم يكن موجود)
   - أو يسجل دخول (إذا كان موجود)
   ↓
6. المستخدم يُوجّه إلى callbackURL
```

---

## 📁 الملفات المتأثرة

### Core Files

- ✅ `src/lib/auth.ts` - Server config
- ✅ `.env.local` - Credentials

### UI Files

- ✅ `src/app/(auth)/sign-in/page.tsx` - Google button
- ✅ `src/app/(auth)/sign-up/page.tsx` - Google button

---

## 🧪 الاختبار

### Development

```bash
# 1. تأكد من credentials في .env.local
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# 2. أعد تشغيل التطبيق
npm run dev

# 3. اذهب إلى
http://localhost:3000/sign-in

# 4. اضغط "Continue with Google"

# 5. اختر حساب Google

# 6. يجب أن تنجح العملية
```

### Production

```bash
# 1. أضف production redirect URI في Google Cloud:
https://yourdomain.com/api/auth/callback/google

# 2. أضف credentials في Vercel/production env

# 3. اختبر من production domain
```

---

## ❌ التعطيل

### الخطوة 1: حذف من `src/lib/auth.ts`

```typescript
export const auth = betterAuth({
  // ... database config
  // احذف هذا القسم
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID || "",
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  //   },
  // },
});
```

### الخطوة 2: حذف Google Buttons من UI

احذف من `src/app/(auth)/sign-in/page.tsx` و `sign-up/page.tsx`:

```typescript
// احذف هذا
<Button onClick={handleGoogleSignIn}>
  <GoogleIcon /> Continue with Google
</Button>

// واحذف الـ handler
// async function handleGoogleSignIn() { ... }
```

### الخطوة 3: حذف Environment Variables

```env
# احذف من .env.local
# GOOGLE_CLIENT_ID="..."
# GOOGLE_CLIENT_SECRET="..."
```

---

## 🐛 المشاكل الشائعة

### 1. "redirect_uri_mismatch"

**المشكلة**: Redirect URI غير مطابق

**الحل**:

```bash
# تأكد من أن redirect URI في Google Cloud مطابق تماماً:
# Development:
http://localhost:3000/api/auth/callback/google

# Production:
https://yourdomain.com/api/auth/callback/google

# ⚠️ لا spaces، لا trailing slash
```

### 2. "access_denied"

**المشكلة**: المستخدم رفض الصلاحيات أو لم يُضاف كـ test user

**الحل**:

```bash
# أضف المستخدم في Google Cloud:
# OAuth consent screen → Test users → Add users
```

### 3. "invalid_client"

**المشكلة**: Client ID أو Secret خاطئ

**الحل**:

```bash
# 1. تحقق من .env.local
# 2. تأكد من نسخ credentials بشكل صحيح
# 3. لا spaces في بداية أو نهاية القيمة
# 4. أعد تشغيل npm run dev
```

### 4. يعمل في Development ولا يعمل في Production

**الحل**:

```bash
# 1. أضف production redirect URI في Google Cloud
# 2. تأكد من environment variables في production
# 3. تحقق من NEXT_PUBLIC_APP_URL
```

---

## 🔒 الأمان

### Best Practices

✅ **افعل**:

- استخدم HTTPS في production
- أضف فقط redirect URIs الصحيحة
- لا تشارك Client Secret
- استخدم different credentials لكل environment

❌ **لا تفعل**:

- لا تضف Client Secret في client-side code
- لا تستخدم نفس credentials للـ dev و production
- لا تضع `*` wildcards في redirect URIs

---

## 📝 معلومات إضافية

### OAuth Scopes

Better Auth يطلب فقط:

- `openid` - هوية المستخدم
- `email` - البريد الإلكتروني
- `profile` - الاسم والصورة

### البيانات المُخزنة

عند استخدام Google OAuth، Better Auth يُخزن:

- Email
- Name
- Profile picture URL
- Google user ID (للربط)

### Account Linking

إذا سجل المستخدم بـ Email/Password ثم استخدم Google بنفس البريد:

- ✅ Better Auth يربط الحسابات تلقائياً
- ✅ يمكن تسجيل الدخول بأي طريقة

---

## 📚 المزيد

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Better Auth Social Providers](https://www.better-auth.com/docs/authentication/social)
- [Modular Setup](../guides/MODULAR_SETUP.md#2-google-oauth)

---

**Google OAuth أسرع طريقة لتحسين user onboarding! 🚀**
