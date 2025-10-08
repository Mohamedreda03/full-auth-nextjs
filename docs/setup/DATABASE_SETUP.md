# إعداد قاعدة البيانات PostgreSQL

## 1. تثبيت PostgreSQL محلياً

### على Windows:

1. قم بتحميل PostgreSQL من [الموقع الرسمي](https://www.postgresql.org/download/windows/)
2. قم بتثبيت PostgreSQL (احفظ كلمة المرور التي تدخلها!)
3. افتح pgAdmin أو psql

### إنشاء قاعدة بيانات جديدة:

```sql
CREATE DATABASE nextjs_auth;
```

## 2. إنشاء ملف .env.local

في جذر المشروع، قم بإنشاء ملف `.env.local` وأضف:

```env
# Database - استبدل البيانات بمعلومات قاعدة بياناتك
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/nextjs_auth"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Better Auth - قم بتوليد مفتاح سري قوي
BETTER_AUTH_SECRET="your-secret-key-change-this-in-production"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (اختياري - للحصول عليها اتبع الخطوات أدناه)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### تفاصيل DATABASE_URL:

```
postgresql://[user]:[password]@[host]:[port]/[database]
```

- `user`: عادة `postgres`
- `password`: كلمة المرور التي أدخلتها عند التثبيت
- `host`: `localhost` للقاعدة المحلية
- `port`: `5432` (الافتراضي)
- `database`: اسم قاعدة البيانات التي أنشأتها (مثل `nextjs_auth`)

## 3. تشغيل الـ migrations لإنشاء الجداول

بعد إنشاء ملف `.env.local`، قم بتشغيل:

```bash
npm run db:push
```

هذا سينشئ الجداول التالية في قاعدة البيانات:

- `user` - بيانات المستخدمين
- `session` - الجلسات
- `account` - حسابات OAuth
- `verification` - رموز التحقق

## 4. الحصول على Google OAuth Credentials (اختياري)

إذا كنت تريد تسجيل الدخول عبر Google:

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروع جديد أو اختر مشروع موجود
3. فعّل Google+ API
4. اذهب إلى "Credentials" → "Create Credentials" → "OAuth client ID"
5. اختر "Web application"
6. أضف Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
7. انسخ Client ID و Client Secret إلى ملف `.env.local`

## 5. التحقق من الإعداد

لعرض قاعدة البيانات والجداول:

```bash
npm run db:studio
```

هذا سيفتح Drizzle Studio في المتصفح حيث يمكنك رؤية وإدارة البيانات.

## 6. تشغيل التطبيق

```bash
npm run dev
```

ثم قم بزيارة:

- Sign Up: http://localhost:3000/sign-up
- Sign In: http://localhost:3000/sign-in

## مشاكل شائعة وحلولها

### خطأ: "connection refused"

- تأكد من أن PostgreSQL يعمل
- تحقق من أن المنفذ 5432 غير محظور

### خطأ: "password authentication failed"

- تحقق من كلمة المرور في DATABASE_URL

### خطأ: "database does not exist"

- قم بإنشاء قاعدة البيانات أولاً باستخدام pgAdmin أو psql
