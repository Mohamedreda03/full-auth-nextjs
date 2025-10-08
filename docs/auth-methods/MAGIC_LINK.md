# ✨ Magic Link Authentication

دليل كامل لتسجيل الدخول بدون كلمة مرور عبر Magic Link.

---

## ✅ الحالة

**مُفعّل** - يحتاج Resend API للعمل.

---

## 📋 المتطلبات

- ✅ قاعدة بيانات PostgreSQL
- 📧 **Resend API key** (مطلوب!)

---

## 🔧 الإعداد

### 1. Resend API

```env
# في .env.local
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="onboarding@resend.dev"
```

📖 **الدليل الكامل**: [Email Service Guide](../guides/EMAIL_SERVICE.md)

### 2. Configuration في `src/lib/auth.ts`

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

### 3. Client Plugin في `src/lib/auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [magicLinkClient()],
});
```

---

## 🎨 الواجهة (UI)

### في Sign-In Page

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

## 🔄 التدفق (Flow)

```
1. المستخدم يُدخل بريده
   ↓
2. Better Auth يُولّد magic link token
   ↓
3. Email يُرسل عبر Resend
   ↓
4. المستخدم يفتح بريده
   ↓
5. يضغط Magic Link
   ↓
6. Better Auth يتحقق من token
   ↓
7. تسجيل دخول تلقائي
   ↓
8. Redirect إلى callbackURL
```

---

## 📁 الملفات المطلوبة

### Core Files

- ✅ `src/lib/auth.ts` - Server config with plugin
- ✅ `src/lib/auth-client.ts` - Client plugin
- ✅ `src/lib/email.ts` - Email service
- ✅ `src/lib/email-templates.ts` - Magic link template

### UI Files

- ✅ `src/app/(auth)/sign-in/page.tsx` - Magic link tab

---

## 🧪 الاختبار

```bash
# 1. تأكد من Resend API في .env.local
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# 2. أعد تشغيل التطبيق
npm run dev

# 3. اذهب إلى sign-in
http://localhost:3000/sign-in

# 4. اختر "Magic Link" tab

# 5. أدخل بريدك

# 6. تحقق من بريدك (تحقق من Spam!)

# 7. اضغط الرابط

# 8. يجب أن تسجل دخول تلقائياً
```

---

## ❌ التعطيل

### 1. حذف من `src/lib/auth.ts`

```typescript
// احذف import
// import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    // احذف من plugins array
    // magicLink({ ... }),
  ],
});
```

### 2. حذف من `src/lib/auth-client.ts`

```typescript
// احذف import
// import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    // احذف من plugins
    // magicLinkClient(),
  ],
});
```

### 3. حذف UI Tab

احذف Magic Link tab من `src/app/(auth)/sign-in/page.tsx`

### 4. حذف Template

احذف `magicLinkTemplate` من `src/lib/email-templates.ts`

---

## 🐛 المشاكل الشائعة

### 1. Email لا يصل

```bash
# تحقق من:
✅ RESEND_API_KEY صحيح
✅ EMAIL_FROM verified (أو استخدم onboarding@resend.dev)
✅ تحقق من Spam folder
✅ تحقق من terminal logs
```

### 2. "Invalid or expired magic link"

```bash
# الأسباب:
- الرابط مُستخدم مسبقاً (Magic links تُستخدم مرة واحدة)
- الرابط expired (15 دقيقة افتراضياً)
- اطلب magic link جديد
```

### 3. يعمل في Development ولا يعمل في Production

```bash
# تأكد من:
✅ RESEND_API_KEY في production environment
✅ NEXT_PUBLIC_APP_URL صحيح
✅ EMAIL_FROM domain verified في production
```

---

## ⚙️ التخصيص

### تغيير مدة الصلاحية

```typescript
magicLink({
  sendMagicLink: async ({ email, url }) => { ... },
  expiresIn: 900, // 15 minutes (default)
  // expiresIn: 600, // 10 minutes
  // expiresIn: 1800, // 30 minutes
}),
```

### Custom Redirect بعد تسجيل الدخول

```typescript
// في UI
await authClient.signIn.magicLink({
  email: data.email,
  callbackURL: "/dashboard", // بدل /
});
```

### Custom Email Template

عدّل `magicLinkTemplate` في `src/lib/email-templates.ts`

---

## 📚 المزيد

- [Email Service Setup](../guides/EMAIL_SERVICE.md)
- [Better Auth Magic Link Docs](https://www.better-auth.com/docs/plugins/magic-link)
- [Modular Setup](../guides/MODULAR_SETUP.md#3-magic-link)

---

**Magic Link = أمان + سهولة استخدام! ✨**
