# Database Connection Issue Fix

## Problem:

```
PostgresError: password authentication failed for user "user"
```

## Cause:

The `.env.local` file contains default values instead of real database information.

## Solution:

### 1. Identify Your PostgreSQL Information:

Open **pgAdmin** or **psql** and get:

- Username (usually: `postgres`)
- Password (the one you entered when installing PostgreSQL)
- Database name (you should have created it beforehand)

### 2. Create Database (if it doesn't exist):

Open **pgAdmin** or **psql** and run:

```sql
CREATE DATABASE nextjs_auth;
```

Or use any name you want for the database.

### 3. Update `.env.local` File:

In the project root, open `.env.local` and change this line:

**Before (wrong):**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

**After (correct):**

```env
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/nextjs_auth"
```

Replace:

- `YOUR_ACTUAL_PASSWORD` with the real PostgreSQL password
- `nextjs_auth` with the database name you created

### 4. Complete `.env.local` File Example:

```env
# Database - put your real database information
DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/nextjs_auth"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Better Auth
BETTER_AUTH_SECRET="some-random-secret-key-change-in-production"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 5. Verify PostgreSQL is Running:

#### On Windows:

1. Open "Services" (Windows Services)
2. Look for "postgresql"
3. Make sure it's running (Running)

Or in PowerShell:

```powershell
Get-Service -Name postgresql*
```

### 6. Test Connection:

After updating `.env.local`, try:

```bash
npm run db:push
```

If successful, you'll see:

```
✓ Pulling schema from database...
✓ Changes applied
```

### 7. Additional Solutions if Problem Persists:

#### a. Check Port:

The default port for PostgreSQL is `5432`. Verify this in PostgreSQL settings.

#### b. Reset PostgreSQL Password:

In **psql** as postgres user:

```sql
ALTER USER postgres WITH PASSWORD 'newpassword';
```

#### c. Check pg_hba.conf:

Make sure the `pg_hba.conf` file allows local connections.

Path (on Windows):

```
C:\Program Files\PostgreSQL\[VERSION]\data\pg_hba.conf
```

Make sure this line exists:

```
host    all             all             127.0.0.1/32            md5
```

### 8. Important Note:

**Never share the `.env.local` file!**

- Contains sensitive information (passwords)
- Automatically added to `.gitignore`

### 9. After Fix:

```bash
# 1. Apply changes to database
npm run db:push

# 2. Run the app
npm run dev

# 3. Go to
# http://localhost:3000/sign-up
```

---

## Quick Test:

To test database connection directly, you can use:

```bash
npm run db:studio
```

This will open Drizzle Studio - if it opens successfully, the connection works! ✅
