# 🔑 Environment Variables Guide

دليل شامل لجميع المتغيرات البيئية المطلوبة في المشروع.

---

## 📋 جدول المحتويات

- [الملف المطلوب](#الملف-المطلوب)
- [المتغيرات الأساسية](#المتغيرات-الأساسية)
- [المتغيرات الاختيارية](#المتغيرات-الاختيارية)
- [أمثلة حسب السيناريو](#أمثلة-حسب-السيناريو)

---

## 📁 الملف المطلوب

أنشئ ملف `.env.local` في الـ root directory:

```bash
# في المجلد الرئيسي للمشروع
touch .env.local

# أو في Windows
type nul > .env.local
```

⚠️ **هام**: ملف `.env.local` مُضاف إلى `.gitignore` تلقائياً - **لا تضفه إلى Git!**

---

## 🔴 المتغيرات الأساسية (Required)

هذه المتغيرات **مطلوبة** لعمل التطبيق:

### 1. Database Connection

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

**مثال واقعي**:

```env
# PostgreSQL محلي
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/nextjs_auth"

# PostgreSQL على Vercel/Supabase
DATABASE_URL="postgresql://user:pass@db.xxx.supabase.co:5432/postgres"

# PostgreSQL مع SSL
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

**كيف تحصل عليه**:

1. **محلياً**: استخدم بيانات PostgreSQL المحلي
2. **Supabase**: Project Settings → Database → Connection String
3. **Vercel**: Storage → Postgres → Connection String
4. **Railway**: Database → Connect → Connection String

### 2. App URL

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**في Production**:

```env
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

⚠️ **لا تنسَ** `NEXT_PUBLIC_` prefix - هذا يجعل المتغير متاحاً في الـ client!

---

## 🟡 المتغيرات الاختيارية (Optional)

### 1. Google OAuth (اختياري)

```env
GOOGLE_CLIENT_ID="123456789-xxxxxxxxxxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxxxx"
```

**متى تحتاجه**: إذا كنت تستخدم Google Sign-In

**كيف تحصل عليه**:

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project أو اختر مشروع موجود
3. APIs & Services → Credentials
4. Create Credentials → OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`

**الدليل الكامل**: [Google OAuth Guide](../auth-methods/GOOGLE_OAUTH.md)

### 2. Resend API (لـ Email Features)

```env
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="onboarding@resend.dev"
```

**متى تحتاجه**: إذا كنت تستخدم:

- ✉️ Email Verification
- 🔄 Password Reset
- ✨ Magic Link
- 🔢 Email OTP

**كيف تحصل عليه**:

1. سجل في [Resend](https://resend.com) (مجاني - 100 email/day)
2. اذهب إلى API Keys
3. Create API Key
4. انسخ الـ key

**EMAIL_FROM Options**:

```env
# Domain تجريبي من Resend (للتطبيق المحلي)
EMAIL_FROM="onboarding@resend.dev"

# Domain خاص بك (في Production)
EMAIL_FROM="noreply@yourdomain.com"
```

**الدليل الكامل**: [Email Service Guide](../guides/EMAIL_SERVICE.md)

### 3. Better Auth (اختياري في Development)

```env
BETTER_AUTH_SECRET="your-random-secret-key-minimum-32-characters-long"
BETTER_AUTH_URL="http://localhost:3000"
```

**متى تحتاجه**:

- ⚠️ **مطلوب في Production**
- ✅ اختياري في Development (Better Auth يولد واحد تلقائياً)

**كيف تولده**:

```bash
# في terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# أو
openssl rand -hex 32
```

---

## 🎯 أمثلة حسب السيناريو

### السيناريو 1: Email/Password فقط (بدون Email Verification)

```env
# الأساسيات
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs_auth"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# لا حاجة لـ:
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - RESEND_API_KEY
# - EMAIL_FROM
```

### السيناريو 2: Email/Password + Google OAuth

```env
# الأساسيات
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs_auth"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="123456789-xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxx"

# لا حاجة لـ Resend إذا لم تستخدم email features
```

### السيناريو 3: Email/Password + Email Verification

```env
# الأساسيات
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs_auth"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email Service (مطلوب)
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="onboarding@resend.dev"
```

### السيناريو 4: جميع الميزات

```env
# الأساسيات
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs_auth"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="123456789-xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxx"

# Email Service
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="onboarding@resend.dev"

# Optional في Development
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
```

### السيناريو 5: Production Setup

```env
# الأساسيات
DATABASE_URL="postgresql://user:pass@production-db.com:5432/db?sslmode=require"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Google OAuth
GOOGLE_CLIENT_ID="123456789-xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxx"

# Email Service
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"

# مطلوب في Production!
BETTER_AUTH_SECRET="your-super-secret-key-minimum-32-characters"
BETTER_AUTH_URL="https://yourdomain.com"
```

---

## ✅ التحقق من الإعداد

بعد إنشاء `.env.local`، تأكد أنه يعمل:

```typescript
// أنشئ ملف test في root: test-env.mjs
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
# شغّله
node test-env.mjs

# ثم احذفه
rm test-env.mjs
```

---

## 🔒 الأمان (Security)

### ✅ افعل:

- ✅ أضف `.env.local` إلى `.gitignore`
- ✅ استخدم secrets مختلفة لكل environment
- ✅ استخدم `.env.example` كـ template للفريق
- ✅ استخدم environment variables في CI/CD

### ❌ لا تفعل:

- ❌ **أبداً** تضف `.env.local` إلى Git
- ❌ **أبداً** تشارك secrets في المحادثات أو Screenshots
- ❌ لا تستخدم نفس DATABASE_URL للـ Development و Production
- ❌ لا تستخدم weak secrets في Production

---

## 🔄 التحديث بعد التغيير

بعد تغيير `.env.local`، أعد تشغيل التطبيق:

```bash
# أوقف التطبيق (Ctrl+C)

# ثم شغّله مرة أخرى
npm run dev
```

---

## 📁 Template File

يوجد ملف `docs/setup/env.example` يحتوي على template كامل:

```bash
# انسخه إلى .env.local
cp docs/setup/env.example .env.local

# ثم عدّل القيم حسب احتياجاتك
```

---

## 🐛 المشاكل الشائعة

### 1. "DATABASE_URL is not set"

```bash
# تأكد من:
# 1. الملف اسمه .env.local (وليس .env أو env.local)
# 2. الملف في root directory
# 3. لا يوجد spaces حول =
# 4. أعد تشغيل npm run dev
```

### 2. "Invalid connection string"

```bash
# تأكد من Format:
postgresql://username:password@host:port/database

# مثال صحيح:
DATABASE_URL="postgresql://postgres:mypass123@localhost:5432/mydb"
```

### 3. NEXT*PUBLIC* variables لا تعمل

```bash
# تأكد من:
# 1. اسم المتغير يبدأ بـ NEXT_PUBLIC_
# 2. أعد تشغيل npm run dev
# 3. في client components فقط
```

### 4. Resend emails لا تُرسل

```bash
# تأكد من:
# 1. RESEND_API_KEY صحيح
# 2. EMAIL_FROM domain verified (أو استخدم onboarding@resend.dev)
# 3. تحقق من terminal للـ logs
```

---

## 📚 المزيد

- [Example Template](./env.example)
- [Database Setup](./DATABASE_SETUP.md)
- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Troubleshooting](../troubleshooting/DATABASE_CONNECTION.md)

---

**Environment Variables هي أساس الأمان والـ Configuration! 🔑**
