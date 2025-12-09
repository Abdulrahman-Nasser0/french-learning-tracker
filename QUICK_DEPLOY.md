# 🚀 Quick Deployment Steps

Your code is pushed! Now follow these steps in order:

## Step 1: Create PostgreSQL Database in Vercel

1. Go to: https://vercel.com/dashboard
2. Click on your **french-learning-tracker** project
3. Click **"Storage"** tab → **"Create Database"** → **"Postgres"**
4. Database name: `french-tracker-db`
5. Click **"Create"** → **"Connect Project"**

## Step 2: Add Environment Variables

Go to: **Settings** → **Environment Variables**

Add these variables:

| Variable | Value | How to Get |
|----------|-------|------------|
| `DATABASE_URL` | Copy from `POSTGRES_PRISMA_URL` | Auto-added by Vercel Postgres |
| `JWT_SECRET` | Generate new secret | Run: `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_NAME` | `French Learning Tracker` | Type it |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL | e.g., `https://french-learning-tracker.vercel.app` |

**Important:** Select **Production**, **Preview**, and **Development** for all variables!

## Step 3: Run Initial Migration

Option A - Using Vercel CLI:
```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Pull env variables
vercel env pull .env.production

# Run migration
DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d '=' -f2-)" npx prisma migrate dev --name init

# Push migration
git add prisma/migrations
git commit -m "Add initial migration"
git push origin main
```

Option B - Let Vercel Handle It:
Just redeploy in Vercel dashboard (the build will fail first time, but that's okay)

## Step 4: Verify Deployment

1. Go to **Deployments** in Vercel
2. Check **Build Logs** - should see:
   - ✅ `prisma generate`
   - ✅ `prisma migrate deploy`
   - ✅ `next build`
3. Visit your app URL
4. Test: Sign Up → Sign In → Log Session

## 🚨 If Build Fails

**Error: "Migration failed"**
- You need to create the migration file first (see Option A above)

**Error: "Cannot connect to database"**
- Check DATABASE_URL in environment variables
- Make sure it's copied from POSTGRES_PRISMA_URL

**Error: "JWT_SECRET not defined"**
- Add JWT_SECRET in environment variables
- Redeploy

## ✅ Success!

When you see:
- Build logs show all ✅ green
- You can access your app
- You can sign up and log in
- Dashboard loads

**You're live! 🎉**

---

## Quick Commands Reference

```bash
# Generate JWT Secret
openssl rand -base64 32

# Regenerate Prisma Client
npx prisma generate

# Create Migration
DATABASE_URL="your-url" npx prisma migrate dev --name init

# Deploy Migration
DATABASE_URL="your-url" npx prisma migrate deploy

# View Database
DATABASE_URL="your-url" npx prisma studio

# Push Changes
git add .
git commit -m "message"
git push origin main
```

---

**📖 Full Guide:** See `VERCEL_DEPLOYMENT.md` for detailed instructions

**🇫🇷 Bonne chance!**
