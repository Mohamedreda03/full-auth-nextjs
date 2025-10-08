# 📚 Complete Documentation

Welcome to the complete authentication system documentation!

---

## 🚀 Start Here

### New to the project?

👉 **[Quick Start Guide](./QUICK_START.md)** - Get started in 5 minutes!

### Want to customize authentication methods?

👉 **[Modular Setup Guide](./guides/MODULAR_SETUP.md)** - Enable/disable any method

---

## 📋 Main Sections

### 🔧 Setup

| Guide                                                     | Description                         | Priority     |
| --------------------------------------------------------- | ----------------------------------- | ------------ |
| [Environment Variables](./setup/ENVIRONMENT_VARIABLES.md) | All required environment variables  | 🔴 Required  |
| [Database Setup](./setup/DATABASE_SETUP.md)               | PostgreSQL setup and table creation | 🔴 Required  |
| [env.example](./setup/env.example)                        | Environment variables template      | 📝 Reference |

### 🔐 Authentication Methods

| Method               | Status          | Guide                                              |
| -------------------- | --------------- | -------------------------------------------------- |
| **Email & Password** | ✅ Enabled      | [Complete Guide](./auth-methods/EMAIL_PASSWORD.md) |
| **Google OAuth**     | ✅ Enabled      | [Complete Guide](./auth-methods/GOOGLE_OAUTH.md)   |
| **Magic Link**       | ⚠️ Needs Resend | [Complete Guide](./auth-methods/MAGIC_LINK.md)     |
| **Email OTP**        | ⚠️ Needs Resend | [Complete Guide](./auth-methods/EMAIL_OTP.md)      |
| **Password Reset**   | ⚠️ Needs Resend | [Complete Guide](./auth-methods/PASSWORD_RESET.md) |
| **Admin Roles**      | ✅ Enabled      | [Complete Guide](./auth-methods/ADMIN_ROLES.md)    |

**Overview**: [Authentication Methods Overview](./auth-methods/README.md)

### 📖 Advanced Guides

| Guide                                         | Description                       | When to read it           |
| --------------------------------------------- | --------------------------------- | ------------------------- |
| [Modular Setup](./guides/MODULAR_SETUP.md) ⭐ | How to enable/disable each method | **When customizing**      |
| [Email Service](./guides/EMAIL_SERVICE.md)    | Setting up Resend for emails      | When using email features |

### 🐛 Troubleshooting

| Issue                                                                 | Solution                   |
| --------------------------------------------------------------------- | -------------------------- |
| [Database Connection Error](./troubleshooting/DATABASE_CONNECTION.md) | Database connection issues |
| Common Issues                                                         | Coming soon                |

---

## 🎯 Quick Scenarios

### I want to use Email/Password only

```
1. ✅ Read: Quick Start Guide
2. ✅ Read: Database Setup
3. ✅ Read: Environment Variables
4. ⚠️ Read: Modular Setup (to remove other methods)
```

### I want to use Email/Password + Google

```
1. ✅ Read: Quick Start Guide
2. ✅ Read: Database Setup
3. ✅ Read: Environment Variables
4. ✅ Read: Google OAuth Guide
```

### I want to use all methods

```
1. ✅ Read: Quick Start Guide
2. ✅ Read: Database Setup
3. ✅ Read: Environment Variables
4. ✅ Read: Email Service Guide
5. ✅ Read: Google OAuth Guide
```

### I have a problem

```
1. 🐛 Read: Troubleshooting Guide
2. 📧 Check terminal logs
3. ✅ Verify Environment Variables
```

---

## 📁 Documentation Structure

```
docs/
├── README.md (you are here)
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
│   ├── PASSWORD_RESET.md
│   └── ADMIN_ROLES.md
│
├── guides/
│   ├── MODULAR_SETUP.md ⭐
│   └── EMAIL_SERVICE.md
│
└── troubleshooting/
    └── DATABASE_CONNECTION.md
```

---

## 🔗 Useful External Links

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

## 📝 Notes

### Recommended Reading Order

1. **For beginners**:
   - Quick Start Guide
   - Database Setup
   - Environment Variables
2. **For customization**:
   - Modular Setup Guide
   - Auth Methods Overview
   - Specific method guides
3. **When having issues**:
   - Troubleshooting guides
   - Check terminal logs
   - Verify environment variables

### Recommended Files by Need

| Need                | Files                        |
| ------------------- | ---------------------------- |
| **Quick start**     | Quick Start, Database Setup  |
| **Complete setup**  | All setup/ files             |
| **Specific method** | Method file in auth-methods/ |
| **Remove methods**  | Modular Setup Guide          |
| **Email setup**     | Email Service Guide          |
| **DB issues**       | Database Connection Guide    |

---

## 💡 Tips

### ✅ Do:

- Read Quick Start first
- Use env.example as template
- Check terminal logs when having issues
- Test each feature after enabling it

### ❌ Don't:

- Skip the order (Database → Env → Auth Methods)
- Forget to restart npm run dev after changing .env
- Delete core files without reading Modular Guide

---

## 🆘 Support

### Having an issue?

1. Check [Troubleshooting Guide](./troubleshooting/DATABASE_CONNECTION.md)
2. Review [Environment Variables Guide](./setup/ENVIRONMENT_VARIABLES.md)
3. Make sure [Database](./setup/DATABASE_SETUP.md) is set up correctly

### Want a new feature?

- Read [Modular Setup](./guides/MODULAR_SETUP.md) to see what's available
- Check [Better Auth Docs](https://www.better-auth.com) for additional features

---

## 🎉 Ready to start?

👉 Start with **[Quick Start Guide](./QUICK_START.md)**

---

<div align="center">

**Made with ❤️ using Better Auth**

[Better Auth](https://www.better-auth.com) • [GitHub](https://github.com/better-auth/better-auth)

</div>
