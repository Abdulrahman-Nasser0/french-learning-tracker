# 🇫🇷 French Learning Tracker

A comprehensive web application for tracking your French language learning journey. Built with Next.js 15, TypeScript, Prisma, and TailwindCSS.

![French Learning Tracker](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)

## ✨ Features

### Core Functionality
- **📚 Study Session Tracking** - Log your daily study sessions with duration, type (speaking, reading, writing, listening, grammar, vocabulary), and notes
- **📊 Visual Progress Dashboard** - Beautiful charts and graphs showing your learning progress over time
- **🎯 Goals System** - Set and track daily, weekly, monthly goals and custom milestones
- **📖 Resource Library** - Organize all your learning materials (books, videos, podcasts, courses)
- **✅ Task Management** - Daily and weekly to-do lists to keep you on track
- **🔥 Streak Tracking** - Build consistency with streak counters and motivation
- **📈 Skill Breakdown** - Dedicated pages for each skill (speaking, reading, writing, listening)
- **🎓 Exam Preparation** - Track practice test results and progress (DELF/DALF/TEF)

### Technical Features
- ✅ Secure authentication with JWT tokens
- ✅ Server-side rendering and API routes
- ✅ Type-safe database queries with Prisma
- ✅ Form validation with Zod
- ✅ Beautiful UI components
- ✅ Fully responsive design

## 🚀 Quick Start

### Prerequisites

Make sure you have Node.js installed (version 18 or higher):

```bash
node --version
```

### Installation & Running

1. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

The `.env` file is already created with:
- `DATABASE_URL` - SQLite database file path
- `JWT_SECRET` - Secret key for JWT tokens (⚠️ **CHANGE THIS in production!**)

3. **Run database migrations**

```bash
npx prisma migrate dev
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
french-project/
├── app/                          # Next.js App Router
│   ├── api/auth/                 # Authentication API routes
│   ├── dashboard/                # Main dashboard
│   ├── study/                    # Study session logging
│   ├── sign-in/                  # Sign in page
│   ├── sign-up/                  # Sign up page
│   └── page.tsx                  # Landing page
├── components/ui/                # UI component library
├── lib/                          # Utilities & helpers
│   ├── auth.ts                   # Authentication
│   ├── prisma.ts                 # Database client
│   └── validations/              # Zod schemas
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── dev.db                    # SQLite database
├── middleware.ts                 # Route protection
└── .env                          # Environment variables
```

## 🗄️ Database

### Viewing the Database

To open Prisma Studio (database GUI):

```bash
npx prisma studio
```

Opens at [http://localhost:5555](http://localhost:5555) - view and edit your data visually.

### Database Schema

- **Users** - User accounts with preferences
- **StudySessions** - Study session records
- **Resources** - Learning materials
- **Tasks** - To-do items
- **Goals** - Learning goals
- **Exams** - Exam preparation
- **PracticeTests** - Test results

## 🔐 Authentication

- **Sign Up** - Create account at `/sign-up`
- **Sign In** - Login at `/sign-in`
- **Protected Routes** - Requires authentication
- Tokens stored in HTTP-only cookies

## 📝 Usage Guide

### First Time Setup

1. Sign up at `/sign-up`
2. Set your target level (A1-C2)
3. Set daily goal (hours/day)
4. Start tracking!

### Daily Workflow

1. **Log sessions** - Duration, type, notes
2. **Check dashboard** - View progress
3. **Manage tasks** - Add to-dos
4. **Track resources** - Add materials

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Next.js
4. Deploy!

### 3. Database for Production

**Option 1: Vercel Postgres** (Recommended)
- In Vercel: Storage → Create Database → Postgres
- Copy `DATABASE_URL` to environment variables
- Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
}
```

- Run: `npx prisma migrate deploy`

**Option 2: Supabase** (Free Tier)
- Create project at [supabase.com](https://supabase.com)
- Get PostgreSQL connection string
- Update Prisma schema and migrate

**Option 3: PlanetScale** (MySQL, Free Tier)
- Create at [planetscale.com](https://planetscale.com)
- Get connection string
- Update Prisma for MySQL

### 4. Environment Variables in Vercel

Set these in Vercel project settings:
- `JWT_SECRET` - Generate secure random string
- `DATABASE_URL` - From your database provider

## 🛠️ Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npx prisma studio    # Open database GUI
npx prisma migrate dev  # Run migrations
```

## 🐛 Troubleshooting

### Database Errors

```bash
npx prisma migrate reset  # Reset database
npx prisma generate       # Regenerate client
```

### Can't Sign In

1. Check `.env` has `JWT_SECRET`
2. Clear browser cookies
3. Try new account

### Port 3000 Taken

```bash
PORT=3001 npm run dev
```

## 📚 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **ORM**: Prisma
- **Auth**: JWT (jose)
- **Styling**: TailwindCSS
- **UI**: Radix UI
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts

## 🎯 Current Status

### ✅ Completed
- [x] Project setup
- [x] Database schema
- [x] Authentication system
- [x] Landing page
- [x] Sign up / Sign in pages
- [x] Middleware & route protection

### 🚧 In Progress
- [ ] Dashboard with stats
- [ ] Study session logging
- [ ] Goals system
- [ ] Resource library
- [ ] Task management

### 📅 Coming Soon
- [ ] Progress analytics
- [ ] Skill breakdown pages
- [ ] Exam preparation
- [ ] Charts & visualizations

## 👤 Author

**Abdulrahman**  
Learning French - 10 month plan (4-5 hrs/day)

---

**Happy Learning! Bonne chance! 🇫🇷**

## 🆘 Need Help?

1. Check this README
2. Open Prisma Studio to view data
3. Check [Prisma docs](https://prisma.io/docs)
4. Check [Next.js docs](https://nextjs.org/docs)

**Note for beginners**: This uses SQLite (file-based database) - no separate database server needed for development!
