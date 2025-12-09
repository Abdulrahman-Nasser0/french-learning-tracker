# 🚀 Deploy French Learning Tracker to Vercel with PostgreSQL

Since you've already deployed your GitHub repo to Vercel, follow these steps to set up PostgreSQL and complete the deployment.

---

## 📋 Step 1: Create Vercel Postgres Database

### Option A: Vercel Postgres (Recommended - Easiest) ⭐

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your `french-learning-tracker` project

2. **Create Storage**
   - Click on the **"Storage"** tab at the top
   - Click **"Create Database"**
   - Select **"Postgres"**
   - Click **"Continue"**

3. **Configure Database**
   - Database name: `french-tracker-db` (or any name you prefer)
   - Region: Choose closest to your users (e.g., `us-east-1`)
   - Click **"Create"**

4. **Connect to Your Project**
   - After creation, click **"Connect Project"**
   - Select your `french-learning-tracker` project
   - Click **"Connect"**
   - Vercel will automatically add these environment variables:
     - `POSTGRES_URL`
     - `POSTGRES_PRISMA_URL` ← **We'll use this one**
     - `POSTGRES_URL_NO_SSL`
     - `POSTGRES_URL_NON_POOLING`
     - `POSTGRES_USER`
     - `POSTGRES_HOST`
     - `POSTGRES_PASSWORD`
     - `POSTGRES_DATABASE`

---

### Option B: External PostgreSQL (Supabase, Neon, Railway)

If you prefer an external provider:

#### **Supabase** (Free tier: 500MB)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from: Settings → Database → Connection String (URI)
4. Copy the connection string (it looks like: `postgresql://postgres:[password]@[host].supabase.co:5432/postgres`)

#### **Neon** (Free tier: 3GB)
1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy the connection string from dashboard

#### **Railway** (Free $5/month credit)
1. Go to [railway.app](https://railway.app)
2. New Project → Provision PostgreSQL
3. Copy DATABASE_URL from variables tab

---

## 🔧 Step 2: Configure Environment Variables in Vercel

1. **Go to Project Settings**
   - In your Vercel project dashboard
   - Click **"Settings"** tab
   - Click **"Environment Variables"** in the left sidebar

2. **Add Required Variables**

   **If using Vercel Postgres (Option A):**
   
   Vercel already added the database variables. Now add these:

   | Variable Name | Value |
   |--------------|--------|
   | `DATABASE_URL` | Copy from `POSTGRES_PRISMA_URL` value |
   | `JWT_SECRET` | Generate a secure random string (see below) |
   | `NEXT_PUBLIC_APP_NAME` | `French Learning Tracker` |
   | `NEXT_PUBLIC_APP_URL` | Your Vercel URL (e.g., `https://french-learning-tracker.vercel.app`) |

   **If using External PostgreSQL (Option B):**

   | Variable Name | Value |
   |--------------|--------|
   | `DATABASE_URL` | Your PostgreSQL connection string |
   | `JWT_SECRET` | Generate a secure random string (see below) |
   | `NEXT_PUBLIC_APP_NAME` | `French Learning Tracker` |
   | `NEXT_PUBLIC_APP_URL` | Your Vercel URL |

3. **Generate JWT_SECRET**
   
   Run this in your terminal:
   ```bash
   openssl rand -base64 32
   ```
   
   Or use: [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
   
   Copy the output and paste it as your `JWT_SECRET` value.

4. **Apply to All Environments**
   - Make sure to select: **Production**, **Preview**, and **Development**
   - Click **"Save"**

---

## 🗄️ Step 3: Run Database Migration

You have two options to run the initial migration:

### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Link Your Project**
   ```bash
   cd /home/abdulrahman/frontEnd/projects/french-project
   vercel link
   ```
   - Select your account
   - Select `french-learning-tracker` project

4. **Pull Environment Variables**
   ```bash
   vercel env pull .env.production
   ```

5. **Run Migration**
   ```bash
   DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d '=' -f2-)" npx prisma migrate deploy
   ```

   Or manually set it:
   ```bash
   # Copy your DATABASE_URL from Vercel dashboard, then:
   DATABASE_URL="your-postgres-url-here" npx prisma migrate deploy
   ```

---

### Option B: Automatic Migration on Build

Your `package.json` is already configured to run migrations during build:

```json
"build": "prisma generate && prisma migrate deploy && next build"
```

Just push your changes and Vercel will run migrations automatically:

```bash
git add .
git commit -m "Switch to PostgreSQL for production"
git push origin main
```

**Note:** First deployment might fail if migrations aren't created yet. If so, create migration first:

```bash
# Locally with your production DATABASE_URL
DATABASE_URL="your-postgres-url" npx prisma migrate dev --name init
git add .
git commit -m "Add initial migration"
git push origin main
```

---

## 📝 Step 4: Update Local Development (Optional)

If you want to test PostgreSQL locally:

1. **Update .env file**
   ```bash
   # Replace your current DATABASE_URL with:
   DATABASE_URL="your-postgres-connection-string"
   JWT_SECRET="your-jwt-secret"
   ```

2. **Run migration**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Test locally**
   ```bash
   npm run dev
   ```

---

## ✅ Step 5: Deploy & Verify

1. **Trigger Deployment**
   
   If you used Option B (automatic migration), your changes are already deploying.
   
   If you used Option A (manual migration), push your changes:
   ```bash
   git add .
   git commit -m "Configure PostgreSQL for production"
   git push origin main
   ```

2. **Monitor Deployment**
   - Go to Vercel Dashboard → Deployments
   - Click on the latest deployment
   - Check **"Build Logs"** for any errors
   - Look for:
     - ✅ `prisma generate` - Should complete successfully
     - ✅ `prisma migrate deploy` - Should apply migrations
     - ✅ `next build` - Should build successfully

3. **Verify Your App**
   - Visit your Vercel URL: `https://french-learning-tracker.vercel.app`
   - **Test Sign Up:** Create a new account
   - **Test Sign In:** Log in with your account
   - **Test Dashboard:** Check if it loads
   - **Test Log Session:** Try logging a study session

4. **Check Database**
   
   **If using Vercel Postgres:**
   - Go to Storage tab in Vercel
   - Click "Data" to browse tables
   - You should see: User, StudySession, Resource, Task, Goal, Exam, PracticeTest tables

   **If using Supabase:**
   - Go to Table Editor in Supabase dashboard
   - Check if tables exist

   **If using Neon/Railway:**
   - Use their SQL editor to verify tables

---

## 🚨 Troubleshooting

### ❌ Build Fails: "Cannot find module '@prisma/client'"

**Solution:** Already fixed! Your `package.json` has:
```json
"postinstall": "prisma generate"
```

### ❌ Build Fails: "Migration failed"

**Possible causes:**
1. DATABASE_URL not set correctly
2. Database doesn't allow connections from Vercel IPs

**Solution:**
- Check DATABASE_URL in Vercel environment variables
- For Supabase: Use the "Connection Pooling" URL for Prisma
- For Neon: Make sure to use the pooled connection string

### ❌ Runtime Error: "PrismaClient is unable to connect"

**Solution:**
- Verify DATABASE_URL is set in Production environment
- Check if database server is running
- For external databases: Check firewall/IP allowlist settings

### ❌ Error: "JWT_SECRET is not defined"

**Solution:**
- Add JWT_SECRET in Vercel environment variables
- Make sure it's applied to Production environment
- Redeploy after adding

### ❌ Page Errors After Deployment

**Solution:**
1. Check Vercel Function Logs:
   - Vercel Dashboard → Your Project → Logs
   - Look for runtime errors

2. Clear browser cache and cookies

3. Try incognito mode

---

## 🎯 Quick Command Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migrations manually
DATABASE_URL="your-url" npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (to view data)
DATABASE_URL="your-url" npx prisma studio

# Push code changes
git add .
git commit -m "your message"
git push origin main
```

---

## 📊 Vercel Postgres Free Tier Limits

- **Storage:** 256 MB
- **Compute:** 60 hours/month
- **Data Transfer:** 256 MB
- **Perfect for:** Personal projects, MVPs, small apps

If you need more, upgrade or use external providers like Supabase (500MB free) or Neon (3GB free).

---

## 🎉 Success Checklist

- [x] PostgreSQL database created
- [x] Environment variables configured in Vercel
- [x] Prisma schema updated to PostgreSQL
- [x] Migrations run successfully
- [x] Code pushed to GitHub
- [x] Vercel deployment successful
- [x] Can sign up and log in
- [x] Can log study sessions
- [x] Dashboard loads correctly

---

## 🔗 Useful Links

- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Vercel Postgres Docs:** [vercel.com/docs/storage/vercel-postgres](https://vercel.com/docs/storage/vercel-postgres)
- **Prisma Docs:** [prisma.io/docs](https://prisma.io/docs)
- **Your Deployment:** Check your Vercel project URL

---

## 💡 Next Steps After Deployment

1. **Set up Custom Domain** (optional)
   - Vercel Settings → Domains → Add Domain
   - Follow DNS configuration instructions

2. **Enable Analytics**
   - Vercel Dashboard → Analytics
   - Monitor page views and performance

3. **Set up Monitoring**
   - Check Vercel Logs regularly
   - Consider adding error tracking (Sentry)

4. **Database Backups**
   - Vercel Postgres: Automatic backups included
   - External: Check provider's backup options

---

**🇫🇷 Bonne chance with your deployment! Your French Learning Tracker is ready to go live!**
