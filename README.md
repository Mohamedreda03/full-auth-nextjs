# Next.js Authentication System with Better Auth

A complete and flexible authentication system built with Next.js 15, Better Auth, Drizzle ORM, and shadcn/ui.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp docs/setup/env.example .env.local
# Edit .env.local with your credentials

# 3. Set up database
npm run db:push

# 4. Run development server
npm run dev
```

🎯 **For details**: Read [Quick Start Guide](./docs/QUICK_START.md)

---

## ✨ Features

### 🔐 Authentication Methods

| Method                 | Status          | Requires           | Guide                                                                |
| ---------------------- | --------------- | ------------------ | -------------------------------------------------------------------- |
| **Email & Password**   | ✅ Works        | Database           | [📖 Guide](./docs/auth-methods/EMAIL_PASSWORD.md)                    |
| **Google OAuth**       | ✅ Works        | Google Credentials | [📖 Guide](./docs/auth-methods/GOOGLE_OAUTH.md)                      |
| **Magic Link**         | ⚠️ Needs Resend | Database + Resend  | [📖 Guide](./docs/auth-methods/MAGIC_LINK.md)                        |
| **Email OTP**          | ⚠️ Needs Resend | Database + Resend  | [📖 Guide](./docs/auth-methods/EMAIL_OTP.md)                         |
| **Password Reset**     | ⚠️ Needs Resend | Database + Resend  | [📖 Guide](./docs/auth-methods/PASSWORD_RESET.md)                    |
| **Email Verification** | ⚠️ Needs Resend | Database + Resend  | [📖 Guide](./docs/auth-methods/EMAIL_PASSWORD.md#email-verification) |
| **Admin Roles**        | ✅ Works        | Database           | [📖 Guide](./docs/auth-methods/ADMIN_ROLES.md)                       |

### 🎨 UI/UX Features

- ✅ Beautiful UI with shadcn/ui components
- ✅ Dark mode support
- ✅ Fully responsive design
- ✅ Form validation with Zod
- ✅ Loading states & error handling
- ✅ TypeScript support
- ✅ Modular authentication (enable/disable any method)

---

## 📚 Documentation

### 🎯 Start Here

| Guide                                                 | When to read it             |
| ----------------------------------------------------- | --------------------------- |
| [📘 Quick Start](./docs/QUICK_START.md)               | For quick start (5 minutes) |
| [🧩 Modular Setup](./docs/guides/MODULAR_SETUP.md) ⭐ | To customize auth methods   |
| [📖 Full Documentation](./docs/README.md)             | For complete documentation  |

### 🔧 Setup

- [Database Setup](./docs/setup/DATABASE_SETUP.md)
- [Environment Variables](./docs/setup/ENVIRONMENT_VARIABLES.md)
- [Email Service Setup](./docs/guides/EMAIL_SERVICE.md)

### 🔐 Authentication Methods

- [Overview](./docs/auth-methods/README.md)
- [Email & Password](./docs/auth-methods/EMAIL_PASSWORD.md)
- [Google OAuth](./docs/auth-methods/GOOGLE_OAUTH.md)
- [Magic Link](./docs/auth-methods/MAGIC_LINK.md)
- [Email OTP](./docs/auth-methods/EMAIL_OTP.md)
- [Password Reset](./docs/auth-methods/PASSWORD_RESET.md)
- [Admin Roles](./docs/auth-methods/ADMIN_ROLES.md)

### 🐛 Troubleshooting

- [Database Connection Issues](./docs/troubleshooting/DATABASE_CONNECTION.md)

---

## 🛠️ Tech Stack

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| **Next.js 15**      | React framework with App Router |
| **Better Auth**     | Modern authentication library   |
| **PostgreSQL**      | Relational database             |
| **Drizzle ORM**     | TypeScript ORM                  |
| **shadcn/ui**       | Beautiful UI components         |
| **Tailwind CSS**    | Utility-first CSS framework     |
| **Zod**             | Schema validation               |
| **React Hook Form** | Form management                 |
| **Resend**          | Email service (optional)        |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/         # Sign in (all methods)
│   │   ├── sign-up/         # Sign up
│   │   ├── forgot-password/ # Request password reset
│   │   └── reset-password/  # Reset password
│   ├── api/auth/[...all]/   # Better Auth API handler
│   ├── dashboard/           # Protected page example
│   └── page.tsx             # Home page
│
├── components/
│   ├── auth/                # Auth-specific components
│   └── ui/                  # shadcn/ui components
│
└── lib/
    ├── auth.ts              # Better Auth server config
    ├── auth-client.ts       # Better Auth client utilities
    ├── email.ts             # Email service (Resend)
    ├── email-templates.ts   # HTML email templates
    └── db/                  # Database
        ├── index.ts         # Database client
        └── schema.ts        # Drizzle schema

docs/                        # 📚 Complete documentation
├── README.md               # Documentation navigation
├── QUICK_START.md          # 5-minute setup guide
├── setup/                  # Setup guides
├── auth-methods/           # Per-method guides
├── guides/                 # Advanced guides
└── troubleshooting/        # Problem solving
```

---

## 🔑 Environment Variables

### Required

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Optional

```env
# Google OAuth
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Email Features (Magic Link, OTP, Password Reset, Verification)
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="onboarding@resend.dev"
```

📖 **Complete guide**: [Environment Variables Guide](./docs/setup/ENVIRONMENT_VARIABLES.md)

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run Biome linter
npm run format       # Format code with Biome

# Database
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

---

## 🎯 Use Cases

### Scenario 1: Email/Password Only

```bash
# Perfect for: SaaS applications, admin panels
✅ Email & Password
❌ Remove Google OAuth
❌ Remove Magic Link
❌ Remove OTP
```

📖 **How?** Read [Modular Setup Guide](./docs/guides/MODULAR_SETUP.md#scenario-1-emailpassword-only)

### Scenario 2: Passwordless Only

```bash
# Perfect for: consumer apps, mobile-first apps
❌ Remove Email & Password
✅ Magic Link
✅ Email OTP
```

📖 **How?** Read [Modular Setup Guide](./docs/guides/MODULAR_SETUP.md#scenario-4-passwordless-only)

### Scenario 3: Everything

```bash
# Perfect for: enterprise apps, flexible platforms
✅ Email & Password
✅ Google OAuth
✅ Magic Link
✅ Email OTP
```

**No changes needed** - everything is already enabled!

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git push origin main

# 2. Import to Vercel
# https://vercel.com/new

# 3. Add Environment Variables
# In Vercel dashboard → Settings → Environment Variables

# 4. Deploy!
```

### Environment Variables in Production

```env
DATABASE_URL="postgresql://..."  # Production DB
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
BETTER_AUTH_SECRET="your-secret-key"  # Required!
RESEND_API_KEY="re_..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

⚠️ **Important**: Update redirect URIs in Google Cloud Console for production domain!

---

## 🧩 Modular Design

This project is designed to be **completely flexible**:

### ✅ You can:

- Enable/disable any authentication method
- Use one method or all of them
- Add new methods easily
- Customize UI for each method

### 📖 Guide:

[Modular Setup Guide](./docs/guides/MODULAR_SETUP.md) - Explains in detail:

- What to keep
- What to remove
- Which files to modify
- How to test after changes

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Read the documentation first
2. Create an issue for discussion
3. Fork → Edit → Pull Request

---

## 📄 License

MIT License - Use it freely!

---

## 🙏 Credits

Built with these amazing tools:

- [Better Auth](https://www.better-auth.com) - Modern auth for TypeScript
- [Next.js](https://nextjs.org) - The React Framework
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM
- [shadcn/ui](https://ui.shadcn.com) - Beautiful components
- [Resend](https://resend.com) - Email for developers

---

## 📞 Support & Links

- [📚 Full Documentation](./docs/README.md)
- [🚀 Quick Start](./docs/QUICK_START.md)
- [🧩 Modular Setup](./docs/guides/MODULAR_SETUP.md)
- [🐛 Troubleshooting](./docs/troubleshooting/DATABASE_CONNECTION.md)
- [Better Auth Docs](https://www.better-auth.com)

---

<div align="center">

### 🎉 Ready to start?

**[📖 Read the Quick Start Guide](./docs/QUICK_START.md)**

Made with ❤️ using Better Auth

</div>
