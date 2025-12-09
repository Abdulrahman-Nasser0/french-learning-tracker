# 🚀 Quick Start Guide

Get your French Learning Tracker running in 60 seconds!

## ✅ Prerequisites Check

```bash
node --version  # Should be v18 or higher
```

If Node.js is not installed, get it from [nodejs.org](https://nodejs.org/)

## 🏃‍♂️ Running the App (3 Steps)

### 1. Start the Server

The development server should already be running. If not:

```bash
npm run dev
```

### 2. Open Your Browser

Go to: **http://localhost:3000**

### 3. Create Your Account

1. Click **"Get Started"** or **"Sign Up"**
2. Fill in:
   - **Name**: Abdulrahman (or your name)
   - **Email**: your@email.com
   - **Password**: anything (min 6 characters)
   - **Starting Level**: A1 (or your current level)
   - **Daily Goal**: 4 hours (or your target)
3. Click **"Create Account"**

🎉 **You're in!** You'll be redirected to your dashboard.

---

## 📚 Test the Core Features

### Test 1: Log Your First Study Session

1. Click the big **"📚 Log Study Session"** button
2. Fill in:
   - **Date**: Today (pre-filled)
   - **Duration**: 30 minutes (or use quick buttons)
   - **Study Type**: Click one (e.g., Reading)
   - **Notes**: "Testing the app" (optional)
3. Click **"Log Session"**
4. You'll be redirected to the dashboard

### Test 2: View Your Dashboard

You should see:
- ✅ Welcome message with your name
- ✅ Today's progress: 0.5 hrs
- ✅ Current streak: 1 day
- ✅ Total hours: 0.5 hrs
- ✅ Your recent session in the list

### Test 3: Log Another Session

1. Click **"Log Session"** again
2. Try different:
   - Duration (60 minutes)
   - Study Type (Speaking)
3. Submit
4. Check dashboard updated!

---

## 🗄️ View Your Database

Want to see the data behind the scenes?

```bash
npx prisma studio
```

This opens a GUI at **http://localhost:5555** where you can:
- View all your sessions
- Edit data directly
- Understand the database structure

---

## 🔍 What Works Right Now

✅ **Authentication**
- Sign up
- Sign in
- Sign out
- Protected routes

✅ **Dashboard**
- Today's stats
- Streak counter
- Total hours
- Recent sessions
- Quick links

✅ **Study Logging**
- Log sessions
- Choose study type
- Add duration
- Write notes
- View history

---

## 🚧 What's Coming Next

The following pages are planned but not yet built:

- [ ] **Progress Page** - Detailed analytics and charts
- [ ] **Goals Page** - Set and track learning goals
- [ ] **Resources Page** - Manage learning materials
- [ ] **Tasks Page** - To-do list for study tasks
- [ ] **Skills Pages** - Individual skill breakdowns
- [ ] **Exams Page** - Track practice tests
- [ ] **Settings Page** - Update profile and preferences

---

## 🎯 Your First Week Challenge

Use this app daily for 7 days:

**Day 1** (Today):
- [x] Create account ✅
- [ ] Log 1-2 study sessions

**Day 2-7**:
- [ ] Log sessions every day
- [ ] Try all 6 study types
- [ ] Add notes to track what works
- [ ] Watch your streak grow! 🔥

---

## 📱 Access from Other Devices

Your app is running locally, so it's only accessible on this computer.

**To access from phone/tablet on same WiFi:**

1. Find your local IP:
```bash
# On Mac/Linux
ifconfig | grep "inet "

# You'll see something like: 192.168.1.102
```

2. On your phone, go to:
```
http://192.168.1.102:3000
```

**Note:** This only works while `npm run dev` is running on your computer.

---

## 🐛 Something Not Working?

### "Page not found" or "Cannot GET /api/..."

- Make sure `npm run dev` is running
- Check terminal for errors
- Try refreshing the page

### "Not authenticated" errors

- Sign out and sign in again
- Clear browser cookies
- Try incognito mode

### Database errors

```bash
# Reset and recreate database
npx prisma migrate reset

# Start fresh with migrations
npx prisma migrate dev
```

### Port 3000 already in use

```bash
# Kill the process
pkill -f "next dev"

# Or use a different port
PORT=3001 npm run dev
```

---

## 💡 Pro Tips

1. **Keep the terminal open** - You'll see logs and errors there
2. **Use browser DevTools** - Right-click → Inspect → Console for errors
3. **Hot reload works** - Save files and see changes instantly
4. **SQLite is just a file** - Your data is in `prisma/dev.db`

---

## 🎓 Learning Resources

### Next.js
- [Official Docs](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### Prisma
- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Studio Guide](https://www.prisma.io/docs/concepts/components/prisma-studio)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript for JS Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

---

## 🚀 Next Steps

Once you're comfortable with the app:

1. **Read the full README.md** - Detailed documentation
2. **Check DEPLOYMENT.md** - Deploy to production
3. **Explore the code** - Learn by reading
4. **Add features** - Start building!

---

## 📞 Quick Reference

**Start server:**
```bash
npm run dev
```

**View database:**
```bash
npx prisma studio
```

**Reset database:**
```bash
npx prisma migrate reset
```

**Stop server:**
Press `Ctrl + C` in the terminal

---

**Enjoy your French learning journey! 🇫🇷**

For more help, check:
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deploy to production
- Code comments - Explanations in the code
