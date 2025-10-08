# PostgreSQL Database Setup

## 1. Install PostgreSQL Locally

### On Windows:

1. Download PostgreSQL from [Official Website](https://www.postgresql.org/download/windows/)
2. Install PostgreSQL (save the password you enter!)
3. Open pgAdmin or psql

### Create New Database:

```sql
CREATE DATABASE nextjs_auth;
```

## 2. Create .env.local File

In the project root, create `.env.local` and add:

```env
# Database - replace with your database information
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/nextjs_auth"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Better Auth - generate a strong secret key
BETTER_AUTH_SECRET="your-secret-key-change-this-in-production"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (optional - follow steps below to get them)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### DATABASE_URL Details:

```
postgresql://[user]:[password]@[host]:[port]/[database]
```

- `user`: usually `postgres`
- `password`: password you entered during installation
- `host`: `localhost` for local database
- `port`: `5432` (default)
- `database`: name of database you created (like `nextjs_auth`)

## 3. Run Migrations to Create Tables

After creating `.env.local`, run:

```bash
npm run db:push
```

This will create the following tables in the database:

- `user` - user data
- `session` - sessions
- `account` - OAuth accounts
- `verification` - verification codes

## 4. Get Google OAuth Credentials (Optional)

If you want Google Sign-In:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret to `.env.local`

## 5. Verify Setup

To view database and tables:

```bash
npm run db:studio
```

This will open Drizzle Studio in browser where you can see and manage data.

## 6. Run Application

```bash
npm run dev
```

Then visit:

- Sign Up: http://localhost:3000/sign-up
- Sign In: http://localhost:3000/sign-in

## Common Issues and Solutions

### Error: "connection refused"

- Make sure PostgreSQL is running
- Check that port 5432 is not blocked

### Error: "password authentication failed"

- Check password in DATABASE_URL

### Error: "database does not exist"

- Create database first using pgAdmin or psql
