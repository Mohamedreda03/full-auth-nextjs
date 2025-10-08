# 📚 دليل التوثيق - Documentation Guide

مرحباً! هذا دليلك الشامل لفهم نظام التوثيق في المشروع.

---

## 🎯 ابدأ من هنا

### أنا جديد - من أين أبدأ؟

```
1. 📖 اقرأ: docs/QUICK_START.md
   └─ تعلّم كيف تشغّل المشروع في 5 دقائق

2. 🔧 اقرأ: docs/setup/DATABASE_SETUP.md
   └─ أنشئ قاعدة البيانات

3. 🔑 اقرأ: docs/setup/ENVIRONMENT_VARIABLES.md
   └─ أضف المتغيرات البيئية
```

### أريد تخصيص طرق المصادقة

```
👉 اذهب إلى: docs/guides/MODULAR_SETUP.md

هذا الملف يشرح لك بالتفصيل:
✅ كيف تُفعّل أي طريقة
✅ كيف تُعطّل أي طريقة
✅ ما الملفات التي تُعدّلها
✅ ما الملفات التي تحذفها
```

### لدي مشكلة

```
👉 اذهب إلى: docs/troubleshooting/
```

---

## 📁 هيكل التوثيق

```
docs/
│
├── README.md                   # 🧭 الدليل الرئيسي - ابدأ من هنا
├── QUICK_START.md              # ⚡ البدء السريع (5 دقائق)
│
├── setup/                      # 🔧 الإعداد الأساسي
│   ├── DATABASE_SETUP.md       #    إعداد PostgreSQL
│   ├── ENVIRONMENT_VARIABLES.md#    جميع المتغيرات البيئية
│   └── env.example             #    Template للـ .env.local
│
├── auth-methods/               # 🔐 دليل كل طريقة مصادقة
│   ├── README.md               #    نظرة عامة على الطرق
│   ├── EMAIL_PASSWORD.md       #    Email & Password
│   ├── GOOGLE_OAUTH.md         #    Google Sign-In
│   ├── MAGIC_LINK.md           #    Magic Link
│   ├── EMAIL_OTP.md            #    Email OTP
│   └── PASSWORD_RESET.md       #    Password Reset
│
├── guides/                     # 📖 الأدلة المتقدمة
│   ├── MODULAR_SETUP.md ⭐     #    تفعيل/تعطيل أي طريقة
│   └── EMAIL_SERVICE.md        #    إعداد Resend
│
└── troubleshooting/            # 🐛 حل المشاكل
    └── DATABASE_CONNECTION.md  #    مشاكل الـ Database
```

---

## 🎓 مسارات التعلم

### المسار 1: المبتدئ (أريد تشغيل المشروع فقط)

```
الترتيب:
1. docs/QUICK_START.md
2. docs/setup/DATABASE_SETUP.md
3. docs/setup/ENVIRONMENT_VARIABLES.md
4. npm run dev

الوقت: ~15 دقيقة
```

### المسار 2: المطور (أريد فهم كل شيء)

```
الترتيب:
1. docs/QUICK_START.md
2. docs/setup/ (جميع الملفات)
3. docs/auth-methods/README.md
4. docs/guides/MODULAR_SETUP.md

الوقت: ~1 ساعة
```

### المسار 3: المتقدم (أريد تخصيص المشروع)

```
الترتيب:
1. docs/guides/MODULAR_SETUP.md ⭐
2. اقرأ فقط docs/auth-methods للطرق التي تريدها
3. docs/guides/EMAIL_SERVICE.md (إذا احتجته)

الوقت: ~30 دقيقة
```

---

## 📖 الملفات الأساسية

### ⭐ الأكثر أهمية

| الملف                                                                        | متى تقرأه        | الوقت    |
| ---------------------------------------------------------------------------- | ---------------- | -------- |
| [docs/QUICK_START.md](./docs/QUICK_START.md)                                 | **الأول دائماً** | 5 دقائق  |
| [docs/guides/MODULAR_SETUP.md](./docs/guides/MODULAR_SETUP.md)               | عند التخصيص      | 15 دقيقة |
| [docs/setup/ENVIRONMENT_VARIABLES.md](./docs/setup/ENVIRONMENT_VARIABLES.md) | عند الإعداد      | 10 دقائق |

### 🔧 إعداد أساسي

| الملف                                                                        | الغرض                         |
| ---------------------------------------------------------------------------- | ----------------------------- |
| [docs/setup/DATABASE_SETUP.md](./docs/setup/DATABASE_SETUP.md)               | كيف تُنشئ PostgreSQL database |
| [docs/setup/ENVIRONMENT_VARIABLES.md](./docs/setup/ENVIRONMENT_VARIABLES.md) | جميع المتغيرات مع أمثلة       |
| [docs/setup/env.example](./docs/setup/env.example)                           | Template للنسخ                |

### 🔐 طرق المصادقة

| الملف                                                                        | الطريقة          | متى تقرأه                    |
| ---------------------------------------------------------------------------- | ---------------- | ---------------------------- |
| [docs/auth-methods/EMAIL_PASSWORD.md](./docs/auth-methods/EMAIL_PASSWORD.md) | Email & Password | إذا أردت تخصيصه أو تعطيله    |
| [docs/auth-methods/GOOGLE_OAUTH.md](./docs/auth-methods/GOOGLE_OAUTH.md)     | Google Sign-In   | لإعداد Google OAuth          |
| [docs/auth-methods/MAGIC_LINK.md](./docs/auth-methods/MAGIC_LINK.md)         | Magic Link       | لفهم أو تعطيل Magic Link     |
| [docs/auth-methods/EMAIL_OTP.md](./docs/auth-methods/EMAIL_OTP.md)           | Email OTP        | لفهم أو تعطيل OTP            |
| [docs/auth-methods/PASSWORD_RESET.md](./docs/auth-methods/PASSWORD_RESET.md) | Password Reset   | لفهم أو تعطيل Password Reset |

---

## 🎯 سيناريوهات شائعة

### السيناريو 1: أريد Email/Password فقط

```
اقرأ:
1. docs/QUICK_START.md
2. docs/guides/MODULAR_SETUP.md#السيناريو-1

احذف:
- Google OAuth
- Magic Link
- Email OTP
```

### السيناريو 2: أريد Google Sign-In فقط

```
اقرأ:
1. docs/QUICK_START.md
2. docs/auth-methods/GOOGLE_OAUTH.md
3. docs/guides/MODULAR_SETUP.md#السيناريو-2

احذف:
- Email & Password
- Magic Link
- Email OTP
```

### السيناريو 3: أريد Passwordless (Magic Link + OTP)

```
اقرأ:
1. docs/QUICK_START.md
2. docs/guides/EMAIL_SERVICE.md
3. docs/guides/MODULAR_SETUP.md#السيناريو-4

احذف:
- Email & Password
- Google OAuth
```

### السيناريو 4: أريد كل شيء

```
اقرأ:
1. docs/QUICK_START.md
2. docs/setup/ENVIRONMENT_VARIABLES.md
3. docs/guides/EMAIL_SERVICE.md
4. docs/auth-methods/GOOGLE_OAUTH.md

لا تحذف شيء! 🎉
```

---

## 🔍 كيف تجد ما تريد؟

### أسئلة شائعة

**"كيف أشغّل المشروع؟"**
→ `docs/QUICK_START.md`

**"كيف أُعطّل Google Sign-In؟"**
→ `docs/guides/MODULAR_SETUP.md#2-google-oauth`

**"كيف أحصل على Resend API؟"**
→ `docs/guides/EMAIL_SERVICE.md`

**"ما هي Environment Variables المطلوبة؟"**
→ `docs/setup/ENVIRONMENT_VARIABLES.md`

**"Database connection error - كيف أحلها؟"**
→ `docs/troubleshooting/DATABASE_CONNECTION.md`

**"كيف أُعطّل Email Verification؟"**
→ `docs/guides/MODULAR_SETUP.md#6-email-verification`

**"ما الفرق بين Magic Link و OTP؟"**
→ `docs/auth-methods/README.md`

---

## 📊 مصفوفة التوثيق

### ما تقرأه حسب احتياجك

| أحتاج                    | الملفات المطلوبة                           | الترتيب |
| ------------------------ | ------------------------------------------ | ------- |
| **البدء من الصفر**       | Quick Start, Database Setup, Env Variables | 1→2→3   |
| **تخصيص الطرق**          | Modular Setup, Auth Methods                | 1→2     |
| **إضافة Google**         | Google OAuth Guide, Modular Setup          | 1→2     |
| **إضافة Email Features** | Email Service, Modular Setup               | 1→2     |
| **حل مشكلة**             | Troubleshooting, Env Variables             | 1→2     |

---

## 💡 نصائح للقراءة

### ✅ افعل

- اقرأ `QUICK_START.md` أولاً **دائماً**
- اتبع الترتيب في كل دليل
- جرّب بعد كل خطوة
- اقرأ فقط ما تحتاجه

### ❌ لا تفعل

- لا تخطئ الترتيب
- لا تقرأ كل شيء دفعة واحدة
- لا تطبق بدون فهم
- لا تحذف ملفات بدون قراءة Modular Guide

---

## 🗺️ خريطة القرارات

```
هل المشروع يعمل؟
├─ لا → docs/QUICK_START.md
└─ نعم → هل تريد تخصيص؟
    ├─ نعم → docs/guides/MODULAR_SETUP.md
    └─ لا → هل لديك مشكلة؟
        ├─ نعم → docs/troubleshooting/
        └─ لا → كل شيء تمام! 🎉
```

---

## 📚 موارد إضافية

### داخل المشروع

- `README.md` في root - نظرة عامة
- `docs/README.md` - فهرس التوثيق
- `docs/setup/env.example` - Template جاهز

### روابط خارجية

- [Better Auth Docs](https://www.better-auth.com)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

## 🎯 التوثيق حسب الدور

### Frontend Developer

```
اقرأ:
- docs/QUICK_START.md
- docs/auth-methods/README.md
- docs/guides/MODULAR_SETUP.md (UI sections)

تخطَّ:
- Database setup details (اطلبها من Backend)
- Email service internals
```

### Backend Developer

```
اقرأ:
- docs/QUICK_START.md
- docs/setup/ (جميع الملفات)
- docs/guides/MODULAR_SETUP.md (Config sections)
- docs/guides/EMAIL_SERVICE.md

تخطَّ:
- UI implementation details
```

### Full-Stack Developer

```
اقرأ:
- كل شيء! 😄
- ابدأ بـ docs/README.md
```

### DevOps/Deployment

```
اقرأ:
- docs/setup/ENVIRONMENT_VARIABLES.md
- docs/setup/DATABASE_SETUP.md
- README.md (Deployment section)

تركيز على:
- Production environment variables
- Database connection strings
- Security best practices
```

---

## 🎓 الخلاصة

### الملفات الـ 3 الأساسية

1. **[docs/QUICK_START.md](./docs/QUICK_START.md)** - ابدأ هنا
2. **[docs/guides/MODULAR_SETUP.md](./docs/guides/MODULAR_SETUP.md)** - للتخصيص
3. **[docs/setup/ENVIRONMENT_VARIABLES.md](./docs/setup/ENVIRONMENT_VARIABLES.md)** - للإعداد

### القاعدة الذهبية

> **اقرأ فقط ما تحتاجه، عندما تحتاجه!**

---

<div align="center">

## 🚀 جاهز للبدء؟

**[👉 اقرأ Quick Start الآن](./docs/QUICK_START.md)**

---

**التوثيق الجيد = نصف النجاح! 📚**

</div>
