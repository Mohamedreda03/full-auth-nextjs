# 👑 Admin Roles & Permissions

دليل كامل لنظام الصلاحيات والأدوار في التطبيق باستخدام Better Auth Admin Plugin.

---

## ✅ الحالة

**مُفعّل** - نظام الصلاحيات جاهز للاستخدام.

---

## 📋 المتطلبات

- ✅ قاعدة بيانات PostgreSQL
- ✅ Better Auth مُفعّل
- ✅ Admin Plugin مُفعّل

---

## 🎯 الأدوار المتاحة

### 1. **User** (المستخدم العادي)

- الدور الافتراضي لجميع المستخدمين الجدد
- صلاحيات محدودة
- لا يمكنه إدارة مستخدمين آخرين

### 2. **Admin** (المدير)

- صلاحيات كاملة
- يمكنه إدارة جميع المستخدمين
- يمكنه تغيير أدوار المستخدمين
- يمكنه حظر/إلغاء حظر المستخدمين

---

## 🔧 الإعداد الحالي

### 1. Database Schema

في `src/lib/db/schema.ts`:

```typescript
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  // 👑 Admin Fields
  role: text("role").default("user"), // "admin" or "user"
  banned: boolean("banned").default(false),
  banReason: text("banReason"),
  banExpires: timestamp("banExpires"),
});
```

### 2. Better Auth Config

في `src/lib/auth.ts`:

```typescript
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  // ... other config

  plugins: [
    admin(), // ⭐ Admin plugin enabled
    // ... other plugins
  ],
});
```

### 3. Auth Client

في `src/lib/auth-client.ts`:

```typescript
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    adminClient(), // ⭐ Admin client plugin
    // ... other plugins
  ],
});

// Helper function
export const useAdmin = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return {
    isAdmin,
    ...adminActions,
  };
};
```

---

## 📚 كيفية الاستخدام

### 1. التحقق من صلاحيات المستخدم

```typescript
"use client";

import { useAdmin } from "@/lib/auth-client";

export function MyComponent() {
  const { isAdmin } = useAdmin();

  return (
    <div>
      {isAdmin && (
        <div>
          <h2>Admin Panel</h2>
          {/* Admin-only content */}
        </div>
      )}
    </div>
  );
}
```

### 2. تغيير دور المستخدم (Admin فقط)

```typescript
"use client";

import { useAdmin } from "@/lib/auth-client";

export function UserManagement() {
  const { setRole } = useAdmin();

  async function makeUserAdmin(userId: string) {
    const result = await setRole({
      userId,
      role: "admin",
    });

    if (result.error) {
      console.error("Failed to update role:", result.error);
      return;
    }

    console.log("User is now admin!");
  }

  return <button onClick={() => makeUserAdmin("user-id")}>Make Admin</button>;
}
```

### 3. حظر مستخدم (Admin فقط)

```typescript
import { useAdmin } from "@/lib/auth-client";

export function BanUser() {
  const { banUser } = useAdmin();

  async function handleBan(userId: string) {
    const result = await banUser({
      userId,
      banReason: "Violation of terms",
      // banExpiresIn: 86400000, // Optional: expires in milliseconds
    });

    if (result.error) {
      console.error("Failed to ban user:", result.error);
      return;
    }

    console.log("User banned successfully!");
  }

  return <button onClick={() => handleBan("user-id")}>Ban User</button>;
}
```

### 4. إلغاء حظر مستخدم

```typescript
import { useAdmin } from "@/lib/auth-client";

export function UnbanUser() {
  const { unbanUser } = useAdmin();

  async function handleUnban(userId: string) {
    const result = await unbanUser({
      userId,
    });

    if (result.error) {
      console.error("Failed to unban user:", result.error);
      return;
    }

    console.log("User unbanned successfully!");
  }

  return <button onClick={() => handleUnban("user-id")}>Unban User</button>;
}
```

### 5. حذف مستخدم (Admin فقط)

```typescript
import { useAdmin } from "@/lib/auth-client";

export function DeleteUser() {
  const { removeUser } = useAdmin();

  async function handleDelete(userId: string) {
    const result = await removeUser({
      userId,
    });

    if (result.error) {
      console.error("Failed to delete user:", result.error);
      return;
    }

    console.log("User deleted successfully!");
  }

  return <button onClick={() => handleDelete("user-id")}>Delete User</button>;
}
```

### 6. عرض جميع المستخدمين (Admin فقط)

```typescript
import { useAdmin } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export function UsersList() {
  const { listUsers } = useAdmin();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const result = await listUsers({
        limit: 10,
        offset: 0,
      });

      if (!result.error) {
        setUsers(result.data.users);
      }
    }

    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email} - Role: {user.role}
        </li>
      ))}
    </ul>
  );
}
```

---

## 🔒 حماية الصفحات (Server-Side)

### 1. حماية صفحة كاملة

```typescript
// src/app/admin/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content */}
    </div>
  );
}
```

### 2. Middleware للحماية

```typescript
// src/middleware.ts
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session || session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

---

## ⚙️ إضافة/إزالة الصلاحيات

### ✅ إضافة دور Admin لمستخدم موجود

#### الطريقة 1: عبر Database

```sql
-- في PostgreSQL
UPDATE "user"
SET role = 'admin'
WHERE email = 'admin@example.com';
```

#### الطريقة 2: عبر API (يحتاج admin آخر)

```typescript
await adminActions.setRole({
  userId: "user-id",
  role: "admin",
});
```

#### الطريقة 3: عبر Drizzle Studio

```bash
npm run db:studio
# افتح المتصفح وعدّل role مباشرة
```

### ❌ إزالة دور Admin

```typescript
await adminActions.setRole({
  userId: "user-id",
  role: "user",
});
```

أو في Database:

```sql
UPDATE "user"
SET role = 'user'
WHERE id = 'user-id';
```

---

## 🎨 أمثلة UI Components

### Admin Badge Component

```typescript
import { ShieldCheckIcon, UserIcon } from "lucide-react";

export function RoleBadge({ role }: { role: string }) {
  if (role === "admin") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
        <ShieldCheckIcon className="h-4 w-4" />
        <span className="text-sm font-semibold">Admin</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
      <UserIcon className="h-4 w-4" />
      <span className="text-sm font-semibold">User</span>
    </div>
  );
}
```

### Admin-Only Section

```typescript
import { useAdmin } from "@/lib/auth-client";

export function AdminSection({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAdmin();

  if (!isAdmin) {
    return null;
  }

  return <div>{children}</div>;
}
```

---

## 🐛 المشاكل الشائعة

### 1. "Permission denied" عند استخدام admin functions

**المشكلة**: المستخدم ليس admin

**الحل**:

```bash
# تحقق من role في database
npm run db:studio

# أو عدّل مباشرة
UPDATE "user" SET role = 'admin' WHERE email = 'your@email.com';
```

### 2. Database migration بعد إضافة role field

**الحل**:

```bash
# أعد push الـ schema
npm run db:push

# أو generate migration
npm run db:generate
npm run db:migrate
```

### 3. Role لا يظهر في session

**الحل**:

```bash
# تأكد من:
# 1. Database schema محدث
# 2. أعد تسجيل الدخول
# 3. تحقق من auth config
```

---

## 📊 Permissions Matrix

| العملية              | User | Admin |
| -------------------- | ---- | ----- |
| **View own profile** | ✅   | ✅    |
| **Edit own profile** | ✅   | ✅    |
| **View other users** | ❌   | ✅    |
| **List all users**   | ❌   | ✅    |
| **Change user role** | ❌   | ✅    |
| **Ban user**         | ❌   | ✅    |
| **Delete user**      | ❌   | ✅    |
| **View admin panel** | ❌   | ✅    |

---

## 🔒 الأمان (Security Best Practices)

### ✅ افعل:

- ✅ دائماً تحقق من الصلاحيات في Server-Side
- ✅ استخدم Middleware لحماية المسارات
- ✅ سجّل جميع admin actions
- ✅ استخدم minimum privilege principle
- ✅ راجع admin users بانتظام

### ❌ لا تفعل:

- ❌ لا تعتمد فقط على Client-Side checks
- ❌ لا تعطي admin role لأي أحد
- ❌ لا تترك admin routes بدون حماية
- ❌ لا تنسَ logging admin actions

---

## 🚀 Advanced: Custom Roles

إذا أردت إضافة أدوار مخصصة (مثل: moderator, editor):

### 1. Update Schema

```typescript
export const user = pgTable("user", {
  // ... other fields
  role: text("role").default("user"), // "admin" | "moderator" | "user"
});
```

### 2. Create Custom Access Control

```typescript
// src/lib/permissions.ts
import { createAccessControl } from "better-auth/plugins/access";

export const statement = {
  user: ["create", "update", "delete"],
  post: ["create", "update", "delete", "publish"],
} as const;

const ac = createAccessControl(statement);

export const userRole = ac.newRole({
  post: ["create"],
});

export const moderatorRole = ac.newRole({
  post: ["create", "update"],
  user: ["update"],
});

export const adminRole = ac.newRole({
  post: ["create", "update", "delete", "publish"],
  user: ["create", "update", "delete"],
});
```

### 3. Use in Auth Config

```typescript
import { admin } from "better-auth/plugins";
import { ac, adminRole, moderatorRole, userRole } from "./permissions";

export const auth = betterAuth({
  plugins: [
    admin({
      ac,
      roles: {
        admin: adminRole,
        moderator: moderatorRole,
        user: userRole,
      },
    }),
  ],
});
```

---

## 📚 المزيد

- [Better Auth Admin Plugin Docs](https://www.better-auth.com/docs/plugins/admin)
- [Better Auth Access Control](https://www.better-auth.com/docs/plugins/access)
- [Modular Setup Guide](../guides/MODULAR_SETUP.md)

---

**إدارة صلاحيات قوية وآمنة! 👑**
