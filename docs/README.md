# 📚 Documentation - التوثيق الكامل

مرحباً بك في توثيق نظام المصادقة الكامل!

---

## 🚀 ابدأ من هنا

### جديد في المشروع؟

👉 **[Quick Start Guide](./QUICK_START.md)** - ابدأ في 5 دقائق!

### تريد تخصيص طرق المصادقة؟

👉 **[Modular Setup Guide](./guides/MODULAR_SETUP.md)** - تفعيل/تعطيل أي طريقة

---

## 📋 الأقسام الرئيسية

### 🔧 الإعداد (Setup)

| الدليل                                                    | الوصف                           | الأولوية |
| --------------------------------------------------------- | ------------------------------- | -------- |
| [Environment Variables](./setup/ENVIRONMENT_VARIABLES.md) | جميع المتغيرات البيئية المطلوبة | 🔴 مطلوب |
| [Database Setup](./setup/DATABASE_SETUP.md)               | إعداد PostgreSQL وإنشاء الجداول | 🔴 مطلوب |
| [env.example](./setup/env.example)                        | Template للمتغيرات البيئية      | 📝 مرجع  |

### 🔐 طرق المصادقة (Authentication Methods)

| الطريقة              | الحالة          | الدليل                                            |
| -------------------- | --------------- | ------------------------------------------------- |
| **Email & Password** | ✅ مُفعّل       | [الدليل الكامل](./auth-methods/EMAIL_PASSWORD.md) |
| **Google OAuth**     | ✅ مُفعّل       | [الدليل الكامل](./auth-methods/GOOGLE_OAUTH.md)   |
| **Magic Link**       | ⚠️ يحتاج Resend | [الدليل الكامل](./auth-methods/MAGIC_LINK.md)     |
| **Email OTP**        | ⚠️ يحتاج Resend | [الدليل الكامل](./auth-methods/EMAIL_OTP.md)      |
| **Password Reset**   | ⚠️ يحتاج Resend | [الدليل الكامل](./auth-methods/PASSWORD_RESET.md) |
| **Admin Roles**      | ✅ مُفعّل       | [الدليل الكامل](./auth-methods/ADMIN_ROLES.md)    |

**نظرة شاملة**: [Authentication Methods Overview](./auth-methods/README.md)

### 📖 الأدلة المتقدمة (Guides)

| الدليل                                        | الوصف                         | متى تقرأه                  |
| --------------------------------------------- | ----------------------------- | -------------------------- |
| [Modular Setup](./guides/MODULAR_SETUP.md) ⭐ | كيفية تفعيل/تعطيل كل طريقة    | **عند التخصيص**            |
| [Email Service](./guides/EMAIL_SERVICE.md)    | إعداد Resend لإرسال الإيميلات | عند استخدام email features |

### 🐛 حل المشاكل (Troubleshooting)

| المشكلة                                                               | الحل                          |
| --------------------------------------------------------------------- | ----------------------------- |
| [Database Connection Error](./troubleshooting/DATABASE_CONNECTION.md) | مشاكل الاتصال بقاعدة البيانات |
| Common Issues                                                         | قريباً                        |

---

## 🎯 السيناريوهات السريعة

### أريد استخدام Email/Password فقط

```
1. ✅ اقرأ: Quick Start Guide
2. ✅ اقرأ: Database Setup
3. ✅ اقرأ: Environment Variables
4. ⚠️ اقرأ: Modular Setup (لإزالة الطرق الأخرى)
```

### أريد استخدام Email/Password + Google

```
1. ✅ اقرأ: Quick Start Guide
2. ✅ اقرأ: Database Setup
3. ✅ اقرأ: Environment Variables
4. ✅ اقرأ: Google OAuth Guide
```

### أريد استخدام جميع الطرق

```
1. ✅ اقرأ: Quick Start Guide
2. ✅ اقرأ: Database Setup
3. ✅ اقرأ: Environment Variables
4. ✅ اقرأ: Email Service Guide
5. ✅ اقرأ: Google OAuth Guide
```

### لدي مشكلة

```
1. 🐛 اقرأ: Troubleshooting Guide
2. 📧 تحقق من terminal logs
3. ✅ تأكد من Environment Variables
```

---

## 📁 هيكل التوثيق

```
docs/
├── README.md (أنت هنا)
├── QUICK_START.md
│
├── setup/
│   ├── DATABASE_SETUP.md
│   ├── ENVIRONMENT_VARIABLES.md
│   └── env.example
│
├── auth-methods/
│   ├── README.md
│   ├── EMAIL_PASSWORD.md
│   ├── GOOGLE_OAUTH.md
│   ├── MAGIC_LINK.md
│   ├── EMAIL_OTP.md
│   └── PASSWORD_RESET.md
│
├── guides/
│   ├── MODULAR_SETUP.md ⭐
│   └── EMAIL_SERVICE.md
│
└── troubleshooting/
    └── DATABASE_CONNECTION.md
```

---

## 🔗 روابط خارجية مفيدة

### Better Auth

- [Official Documentation](https://www.better-auth.com)
- [API Reference](https://www.better-auth.com/docs/api-reference)
- [GitHub](https://github.com/better-auth/better-auth)

### Database & ORM

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

### Email Service

- [Resend Documentation](https://resend.com/docs)
- [Resend Dashboard](https://resend.com/overview)

### OAuth Providers

- [Google Cloud Console](https://console.cloud.google.com/)
- [Google OAuth Setup Guide](https://support.google.com/cloud/answer/6158849)

### UI Components

- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)

---

## 📝 ملاحظات

### الترتيب الموصى به للقراءة

1. **للمبتدئين**:
   - Quick Start Guide
   - Database Setup
   - Environment Variables
2. **للتخصيص**:

   - Modular Setup Guide
   - Auth Methods Overview
   - Specific method guides

3. **عند المشاكل**:
   - Troubleshooting guides
   - Check terminal logs
   - Verify environment variables

### الملفات المُوصى بها حسب الحاجة

| الحاجة                | الملفات                      |
| --------------------- | ---------------------------- |
| **البدء السريع**      | Quick Start, Database Setup  |
| **الإعداد الكامل**    | جميع ملفات setup/            |
| **تفصيل طريقة معينة** | ملف الطريقة في auth-methods/ |
| **إزالة طرق**         | Modular Setup Guide          |
| **إعداد Email**       | Email Service Guide          |
| **مشاكل DB**          | Database Connection Guide    |

---

## 💡 نصائح

### ✅ افعل:

- اقرأ Quick Start أولاً
- استخدم env.example كـ template
- تحقق من terminal logs عند المشاكل
- اختبر كل feature بعد تفعيلها

### ❌ لا تفعل:

- لا تخطئ الترتيب (Database → Env → Auth Methods)
- لا تنسَ إعادة تشغيل npm run dev بعد تغيير .env
- لا تحذف core files بدون قراءة Modular Guide

---

## 🆘 الدعم

### لديك مشكلة؟

1. تحقق من [Troubleshooting Guide](./troubleshooting/DATABASE_CONNECTION.md)
2. راجع [Environment Variables Guide](./setup/ENVIRONMENT_VARIABLES.md)
3. تأكد من إعداد [Database](./setup/DATABASE_SETUP.md) بشكل صحيح

### تريد feature جديدة؟

- اقرأ [Modular Setup](./guides/MODULAR_SETUP.md) لمعرفة ما هو متاح
- تحقق من [Better Auth Docs](https://www.better-auth.com) للميزات الإضافية

---

## 🎉 جاهز للبدء؟

👉 ابدأ مع **[Quick Start Guide](./QUICK_START.md)**

---

<div align="center">

**صُنع بـ ❤️ باستخدام Better Auth**

[Better Auth](https://www.better-auth.com) • [GitHub](https://github.com/better-auth/better-auth)

</div>
