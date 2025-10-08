# حل مشكلة الاتصال بقاعدة البيانات

## المشكلة:

```
PostgresError: password authentication failed for user "user"
```

## السبب:

ملف `.env.local` يحتوي على قيم افتراضية وليست معلومات قاعدة البيانات الحقيقية.

## الحل:

### 1. تحديد معلومات PostgreSQL الخاصة بك:

افتح **pgAdmin** أو **psql** واحصل على:

- اسم المستخدم (عادة: `postgres`)
- كلمة المرور (التي أدخلتها عند تثبيت PostgreSQL)
- اسم قاعدة البيانات (يجب أن تكون قد أنشأتها مسبقاً)

### 2. إنشاء قاعدة بيانات (إذا لم تكن موجودة):

افتح **pgAdmin** أو **psql** ونفذ:

```sql
CREATE DATABASE nextjs_auth;
```

أو استخدم أي اسم تريده لقاعدة البيانات.

### 3. تحديث ملف `.env.local`:

في جذر المشروع، افتح ملف `.env.local` وغيّر هذا السطر:

**قبل (خطأ):**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

**بعد (صحيح):**

```env
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/nextjs_auth"
```

استبدل:

- `YOUR_ACTUAL_PASSWORD` بكلمة المرور الحقيقية لـ PostgreSQL
- `nextjs_auth` باسم قاعدة البيانات التي أنشأتها

### 4. مثال كامل لملف `.env.local`:

```env
# Database - ضع معلومات قاعدة البيانات الحقيقية
DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/nextjs_auth"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Better Auth
BETTER_AUTH_SECRET="some-random-secret-key-change-in-production"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (اختياري)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 5. التحقق من أن PostgreSQL يعمل:

#### على Windows:

1. افتح "Services" (خدمات Windows)
2. ابحث عن "postgresql"
3. تأكد أنه يعمل (Running)

أو في PowerShell:

```powershell
Get-Service -Name postgresql*
```

### 6. اختبار الاتصال:

بعد تحديث `.env.local`، جرب:

```bash
npm run db:push
```

إذا نجح الأمر، سترى:

```
✓ Pulling schema from database...
✓ Changes applied
```

### 7. حلول إضافية إذا استمرت المشكلة:

#### أ. تأكد من المنفذ (Port):

المنفذ الافتراضي لـ PostgreSQL هو `5432`. تحقق من ذلك في إعدادات PostgreSQL.

#### ب. إعادة تعيين كلمة مرور PostgreSQL:

في **psql** كمستخدم postgres:

```sql
ALTER USER postgres WITH PASSWORD 'newpassword';
```

#### ج. التحقق من pg_hba.conf:

تأكد من أن ملف `pg_hba.conf` يسمح بالاتصال المحلي.

المسار (على Windows):

```
C:\Program Files\PostgreSQL\[VERSION]\data\pg_hba.conf
```

تأكد من وجود هذا السطر:

```
host    all             all             127.0.0.1/32            md5
```

### 8. نصيحة مهمة:

**لا تشارك ملف `.env.local` أبداً!**

- يحتوي على معلومات حساسة (كلمات مرور)
- هو مُضاف تلقائياً إلى `.gitignore`

### 9. بعد الإصلاح:

```bash
# 1. طبق التغييرات على قاعدة البيانات
npm run db:push

# 2. شغل التطبيق
npm run dev

# 3. اذهب إلى
# http://localhost:3000/sign-up
```

---

## اختبار سريع:

لاختبار اتصال قاعدة البيانات مباشرة، يمكنك استخدام:

```bash
npm run db:studio
```

هذا سيفتح Drizzle Studio - إذا فتح بنجاح، فالاتصال يعمل! ✅
