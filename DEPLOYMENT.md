# 🚀 Deployment Guide - French Learning Tracker

This guide will walk you through deploying your French Learning Tracker to production using Vercel and a PostgreSQL database.

## 📋 Pre-Deployment Checklist

- [x] Application works locally (`npm run dev`)
- [x] Database schema is finalized
- [ ] Code is pushed to GitHub
- [ ] Production database is chosen
- [ ] Environment variables are ready

## 🔧 Step 1: Prepare Your Code

### 1.1 Initialize Git (if not done)

```bash
git init
git add .
git commit -m "Initial commit - French Learning Tracker"
```

### 1.2 Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `french-learning-tracker`
3. Keep it public or private (your choice)
4. **Don't** initialize with README (you already have one)

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/french-learning-tracker.git
git branch -M main
git push -u origin main
```

## 🗄️ Step 2: Choose Your Database

### Option A: Vercel Postgres (Recommended) ⭐

**Free Tier:** 
- 256 MB storage
- 60 hours compute time/month
- Perfect for personal projects

**Setup:**
1. Deploy to Vercel first (Step 3)
2. In Vercel dashboard, go to your project
3. Click "Storage" → "Create Database" → "Postgres"
4. Click "Connect" → Copy environment variables
5. They'll auto-populate in your project settings

**Pros:**
- Zero configuration
- Automatically integrated with Vercel
- Great performance
- Simple pricing

**Cons:**
- Tied to Vercel ecosystem
- Limited free tier

---

### Option B: Supabase (Great for Beginners) 🚀

**Free Tier:**
- 500 MB storage
- Unlimited API requests
- 50,000 monthly active users
- Includes authentication, storage, and more

**Setup:**

1. Go to [supabase.com](https://supabase.com)
2. Create account → "New Project"
3. Choose project name, database password, region
4. Wait for project to initialize (~2 minutes)
5. Go to Settings → Database
6. Copy "Connection string" (URI format)
7. Replace `[YOUR-PASSWORD]` with your database password

Example connection string:
```
postgresql://postgres:[YOUR-PASSWORD]@db.abc123xyz.supabase.co:5432/postgres
```

8. Add to `.env` as `DATABASE_URL`

**Pros:**
- Very generous free tier
- Great documentation
- Includes many features (auth, storage, real-time)
- Good community

**Cons:**
- May be overkill for simple projects
- Extra features you might not need

---

### Option C: Railway (Simple & Free) 🚂

**Free Tier:**
- $5 free credit/month
- Enough for small projects
- Simple interface

**Setup:**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. "New Project" → "Provision PostgreSQL"
4. Click on Postgres → Connect → Copy DATABASE_URL
5. Add to your environment variables

**Pros:**
- Simple setup
- Good free tier
- Nice UI
- Quick to get started

**Cons:**
- Free credits expire
- Smaller community than others

---

### Option D: Neon (Serverless) ⚡

**Free Tier:**
- 3 GB storage
- Unlimited projects
- Serverless (scales to zero)

**Setup:**

1. Go to [neon.tech](https://neon.tech)
2. Sign up → Create Project
3. Copy connection string
4. Add as `DATABASE_URL`

**Pros:**
- Serverless (pay only for usage)
- Great free tier
- Fast cold starts
- Modern architecture

**Cons:**
- Newer service
- Less mature ecosystem

---

## 🎯 Step 3: Deploy to Vercel

### 3.1 Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your `french-learning-tracker` repository
5. Vercel auto-detects Next.js - perfect! ✅

### 3.2 Configure Environment Variables

Before deploying, add these in Vercel's environment variables section:

```bash
# Database URL (from your chosen provider)
DATABASE_URL="your-production-database-url"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secure-random-string-at-least-32-characters-long"

# App Configuration
NEXT_PUBLIC_APP_NAME="French Learning Tracker"
NEXT_PUBLIC_APP_URL="https://your-app-name.vercel.app"
```

**Generating a secure JWT_SECRET:**

```bash
# On Mac/Linux
openssl rand -base64 32

# Or use this online:
# https://generate-secret.now.sh/32
```

### 3.3 Deploy

1. Click "Deploy"
2. Wait ~2-3 minutes
3. Vercel will give you a URL: `your-app-name.vercel.app`

**🎉 Your app is now live!**

---

## 🗄️ Step 4: Set Up Production Database

### 4.1 Update Prisma Schema for PostgreSQL

If you chose PostgreSQL (Vercel Postgres, Supabase, Railway, or Neon), update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from sqlite
}
```

### 4.2 Run Migrations on Production

**Option 1: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migrations
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

**Option 2: Using Prisma Studio**

```bash
# Set production database URL
export DATABASE_URL="your-production-url"

# Deploy migrations
npx prisma migrate deploy
```

**Option 3: Automatic Migrations on Deploy**

Add this to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && prisma migrate deploy && next build",
    "start": "next start"
  }
}
```

This runs migrations automatically on each deployment.

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Your App

1. Visit your Vercel URL
2. Sign up with a new account
3. Log a study session
4. Check the dashboard

### 5.2 Check Database

Using Prisma Studio:
```bash
DATABASE_URL="your-production-url" npx prisma studio
```

Or use your provider's dashboard:
- **Vercel Postgres**: Vercel Dashboard → Storage → Data
- **Supabase**: Table Editor in Supabase dashboard
- **Railway**: Database → pgAdmin
- **Neon**: SQL Editor in Neon console

---

## 🔒 Step 6: Security Checklist

- [ ] `JWT_SECRET` is strong and unique (32+ characters)
- [ ] `.env` is in `.gitignore` (check!)
- [ ] Database credentials are not in code
- [ ] HTTPS is enabled (Vercel does this automatically)
- [ ] CORS is properly configured (Next.js handles this)

---

## 🎨 Step 7: Custom Domain (Optional)

### Free Option: Vercel Subdomain
Your app is at `your-app-name.vercel.app` - completely free!

### Paid Option: Custom Domain

1. Buy domain from [Namecheap](https://namecheap.com), [Google Domains](https://domains.google), etc.
2. In Vercel: Settings → Domains → Add
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~5-60 minutes)

---

## 📊 Step 8: Monitor Your App

### Vercel Analytics (Free)

- Go to Vercel Dashboard → Analytics
- See page views, load times, errors
- Upgrade for more detailed analytics

### Error Tracking (Optional)

Consider adding:
- [Sentry](https://sentry.io) - Error tracking (free tier available)
- [LogRocket](https://logrocket.com) - Session replay (free tier)

---

## 🔄 Step 9: Deploy Updates

When you make changes:

```bash
# Commit changes
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin main

# Vercel automatically deploys! 🎉
```

Vercel will:
1. Detect the push
2. Build your app
3. Run tests (if any)
4. Deploy automatically
5. Send you a notification

---

## 🚨 Troubleshooting

### Build Fails

**Error: "Cannot find module '@prisma/client'"**

Solution: Add to `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

**Error: "Database connection failed"**

- Check `DATABASE_URL` in Vercel environment variables
- Ensure database allows connections from Vercel IPs
- For Supabase: Check "Connection Pooling" tab

### Runtime Errors

**Error: "Not authenticated" on protected pages**

- Check `JWT_SECRET` is set in Vercel
- Clear browser cookies
- Try incognito mode

**Error: "Prisma Client not found"**

```bash
# In your local terminal
npm run build

# If it works locally, push again
git push origin main
```

### Database Issues

**Migrations fail on deployment**

1. Check database connection string
2. Ensure database is accessible
3. Try manual migration:
```bash
DATABASE_URL="your-url" npx prisma migrate deploy
```

---

## 💰 Cost Breakdown

### Completely Free Setup ✨

- **Hosting**: Vercel (Free tier)
- **Database**: Supabase (Free tier) or Neon (Free tier)
- **Domain**: `your-app.vercel.app` (Free Vercel subdomain)

**Total: $0/month** 🎉

### Paid Setup (if you scale up)

- **Hosting**: Vercel Pro ($20/month) - More bandwidth, better analytics
- **Database**: Supabase Pro ($25/month) or Vercel Postgres ($10+/month)
- **Domain**: ~$12/year

**Total: ~$50-60/month** (only if you outgrow free tiers)

---

## 📝 Next Steps

After deployment:

1. ✅ Test all features
2. ✅ Share with friends for feedback
3. ✅ Add more features (Resources, Goals, Tasks)
4. ✅ Consider adding analytics
5. ✅ Set up automated backups (database provider dashboard)

---

## 🆘 Need Help?

1. Check Vercel logs: Dashboard → Deployments → Your deployment → Build logs
2. Check Prisma Studio for database issues
3. Review Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
4. Review Prisma docs: [prisma.io/docs](https://prisma.io/docs)

---

## 🎉 You're Live!

Congratulations! Your French Learning Tracker is now live on the internet. Share it with fellow language learners and start tracking your journey to fluency!

**Your URL:** `https://your-app-name.vercel.app`

---

**Good luck with your French learning! Bonne chance! 🇫🇷**
