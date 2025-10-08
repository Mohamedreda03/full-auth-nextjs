# 📚 Documentation Guide

Welcome! This is your comprehensive guide to understanding the project's documentation system.

---

## 🎯 Start Here

### I'm New - Where Do I Start?

```
1. 📖 Read: docs/QUICK_START.md
   └─ Learn how to run the project in 5 minutes

2. 🔧 Read: docs/setup/DATABASE_SETUP.md
   └─ Create the database

3. 🔑 Read: docs/setup/ENVIRONMENT_VARIABLES.md
   └─ Add environment variables
```

### I Want to Customize Authentication Methods

```
👉 Go to: docs/guides/MODULAR_SETUP.md

This file explains in detail:
✅ How to enable any method
✅ How to disable any method
✅ Which files to modify
✅ Which files to delete
```

### I Have a Problem

```
👉 Go to: docs/troubleshooting/
```

---

## 📁 Documentation Structure

```
docs/
│
├── README.md                   # 🧭 Main guide - start here
├── QUICK_START.md              # ⚡ Quick start (5 minutes)
│
├── setup/                      # 🔧 Basic setup
│   ├── DATABASE_SETUP.md       #    PostgreSQL setup
│   ├── ENVIRONMENT_VARIABLES.md#    All environment variables
│   └── env.example             #    Template for .env.local
│
├── auth-methods/               # 🔐 Each authentication method guide
│   ├── README.md               #    Overview of methods
│   ├── EMAIL_PASSWORD.md       #    Email & Password
│   ├── GOOGLE_OAUTH.md         #    Google Sign-In
│   ├── MAGIC_LINK.md           #    Magic Link
│   ├── EMAIL_OTP.md            #    Email OTP
│   ├── PASSWORD_RESET.md       #    Password Reset
│   └── ADMIN_ROLES.md          #    Admin Roles & Permissions
│
├── guides/                     # 📖 Advanced guides
│   ├── MODULAR_SETUP.md ⭐     #    Enable/disable any method
│   └── EMAIL_SERVICE.md        #    Resend setup
│
└── troubleshooting/            # 🐛 Problem solving
    └── DATABASE_CONNECTION.md  #    Database issues
```

---

## 🎓 Learning Paths

### Path 1: Beginner (I just want to run the project)

```
Order:
1. docs/QUICK_START.md
2. docs/setup/DATABASE_SETUP.md
3. docs/setup/ENVIRONMENT_VARIABLES.md
4. npm run dev

Time: ~15 minutes
```

### Path 2: Developer (I want to understand everything)

```
Order:
1. docs/QUICK_START.md
2. docs/setup/ (all files)
3. docs/auth-methods/README.md
4. docs/guides/MODULAR_SETUP.md

Time: ~1 hour
```

### Path 3: Advanced (I want to customize the project)

```
Order:
1. docs/guides/MODULAR_SETUP.md ⭐
2. Read only docs/auth-methods for methods you want
3. docs/guides/EMAIL_SERVICE.md (if needed)

Time: ~30 minutes
```

---

## 📖 Essential Files

### ⭐ Most Important

| File                                                                         | When to Read It  | Time       |
| ---------------------------------------------------------------------------- | ---------------- | ---------- |
| [docs/QUICK_START.md](./docs/QUICK_START.md)                                 | **Always First** | 5 minutes  |
| [docs/guides/MODULAR_SETUP.md](./docs/guides/MODULAR_SETUP.md)               | When customizing | 15 minutes |
| [docs/setup/ENVIRONMENT_VARIABLES.md](./docs/setup/ENVIRONMENT_VARIABLES.md) | When setting up  | 10 minutes |

### 🔧 Basic Setup

| File                                                                         | Purpose                           |
| ---------------------------------------------------------------------------- | --------------------------------- |
| [docs/setup/DATABASE_SETUP.md](./docs/setup/DATABASE_SETUP.md)               | How to create PostgreSQL database |
| [docs/setup/ENVIRONMENT_VARIABLES.md](./docs/setup/ENVIRONMENT_VARIABLES.md) | All variables with examples       |
| [docs/setup/env.example](./docs/setup/env.example)                           | Template to copy                  |

### 🔐 Authentication Methods

| File                                                                         | Method           | When to Read It                         |
| ---------------------------------------------------------------------------- | ---------------- | --------------------------------------- |
| [docs/auth-methods/EMAIL_PASSWORD.md](./docs/auth-methods/EMAIL_PASSWORD.md) | Email & Password | If you want to customize or disable it  |
| [docs/auth-methods/GOOGLE_OAUTH.md](./docs/auth-methods/GOOGLE_OAUTH.md)     | Google Sign-In   | To set up Google OAuth                  |
| [docs/auth-methods/MAGIC_LINK.md](./docs/auth-methods/MAGIC_LINK.md)         | Magic Link       | To understand or disable Magic Link     |
| [docs/auth-methods/EMAIL_OTP.md](./docs/auth-methods/EMAIL_OTP.md)           | Email OTP        | To understand or disable OTP            |
| [docs/auth-methods/PASSWORD_RESET.md](./docs/auth-methods/PASSWORD_RESET.md) | Password Reset   | To understand or disable Password Reset |
| [docs/auth-methods/ADMIN_ROLES.md](./docs/auth-methods/ADMIN_ROLES.md)       | Admin Roles      | To understand admin system              |

---

## 🎯 Common Scenarios

### Scenario 1: I Want Email/Password Only

```
Read:
1. docs/QUICK_START.md
2. docs/guides/MODULAR_SETUP.md#scenario-1

Delete:
- Google OAuth
- Magic Link
- Email OTP
```

### Scenario 2: I Want Google Sign-In Only

```
Read:
1. docs/QUICK_START.md
2. docs/auth-methods/GOOGLE_OAUTH.md
3. docs/guides/MODULAR_SETUP.md#scenario-2

Delete:
- Email & Password
- Magic Link
- Email OTP
```

### Scenario 3: I Want Passwordless (Magic Link + OTP)

```
Read:
1. docs/QUICK_START.md
2. docs/guides/EMAIL_SERVICE.md
3. docs/guides/MODULAR_SETUP.md#scenario-4

Delete:
- Email & Password
- Google OAuth
```

### Scenario 4: I Want Everything

```
Read:
1. docs/QUICK_START.md
2. docs/setup/ENVIRONMENT_VARIABLES.md
3. docs/guides/EMAIL_SERVICE.md
4. docs/auth-methods/GOOGLE_OAUTH.md

Don't delete anything! 🎉
```

---

## 🔍 How to Find What You Want?

### Common Questions

**"How do I run the project?"**
→ `docs/QUICK_START.md`

**"How do I disable Google Sign-In?"**
→ `docs/guides/MODULAR_SETUP.md#2-google-oauth`

**"How do I get Resend API?"**
→ `docs/guides/EMAIL_SERVICE.md`

**"What Environment Variables are required?"**
→ `docs/setup/ENVIRONMENT_VARIABLES.md`

**"Database connection error - how do I fix it?"**
→ `docs/troubleshooting/DATABASE_CONNECTION.md`

**"How do I disable Email Verification?"**
→ `docs/guides/MODULAR_SETUP.md#6-email-verification`

**"What's the difference between Magic Link and OTP?"**
→ `docs/auth-methods/README.md`

---

## 📊 Documentation Matrix

### What to Read Based on Your Need

| I Need                 | Required Files                             | Order |
| ---------------------- | ------------------------------------------ | ----- |
| **Start from Scratch** | Quick Start, Database Setup, Env Variables | 1→2→3 |
| **Customize Methods**  | Modular Setup, Auth Methods                | 1→2   |
| **Add Google**         | Google OAuth Guide, Modular Setup          | 1→2   |
| **Add Email Features** | Email Service, Modular Setup               | 1→2   |
| **Fix a Problem**      | Troubleshooting, Env Variables             | 1→2   |

---

## 💡 Reading Tips

### ✅ Do

- Read `QUICK_START.md` first **always**
- Follow the order in each guide
- Test after each step
- Read only what you need

### ❌ Don't

- Don't skip the order
- Don't read everything at once
- Don't apply without understanding
- Don't delete files without reading Modular Guide

---

## 🗺️ Decision Map

```
Does the project work?
├─ No → docs/QUICK_START.md
└─ Yes → Do you want to customize?
    ├─ Yes → docs/guides/MODULAR_SETUP.md
    └─ No → Do you have a problem?
        ├─ Yes → docs/troubleshooting/
        └─ No → Everything is perfect! 🎉
```

---

## 📚 Additional Resources

### Within the Project

- `README.md` in root - overview
- `docs/README.md` - documentation index
- `docs/setup/env.example` - ready template

### External Links

- [Better Auth Docs](https://www.better-auth.com)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

## 🎯 Documentation by Role

### Frontend Developer

```
Read:
- docs/QUICK_START.md
- docs/auth-methods/README.md
- docs/guides/MODULAR_SETUP.md (UI sections)

Skip:
- Database setup details (ask Backend)
- Email service internals
```

### Backend Developer

```
Read:
- docs/QUICK_START.md
- docs/setup/ (all files)
- docs/guides/MODULAR_SETUP.md (Config sections)
- docs/guides/EMAIL_SERVICE.md

Skip:
- UI implementation details
```

### Full-Stack Developer

```
Read:
- Everything! 😄
- Start with docs/README.md
```

### DevOps/Deployment

```
Read:
- docs/setup/ENVIRONMENT_VARIABLES.md
- docs/setup/DATABASE_SETUP.md
- README.md (Deployment section)

Focus on:
- Production environment variables
- Database connection strings
- Security best practices
```

---

## 🎓 Summary

### The 3 Essential Files

1. **[docs/QUICK_START.md](./docs/QUICK_START.md)** - Start here
2. **[docs/guides/MODULAR_SETUP.md](./docs/guides/MODULAR_SETUP.md)** - For customization
3. **[docs/setup/ENVIRONMENT_VARIABLES.md](./docs/setup/ENVIRONMENT_VARIABLES.md)** - For setup

### Golden Rule

> **Read only what you need, when you need it!**

---

<div align="center">

## 🚀 Ready to Start?

**[👉 Read Quick Start Now](./docs/QUICK_START.md)**

---

**Good documentation = Half the success! 📚**

</div>
