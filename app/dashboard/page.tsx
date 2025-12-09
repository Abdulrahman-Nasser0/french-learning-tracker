import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    redirect('/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser.userId },
    select: {
      name: true,
      targetLanguage: true,
      targetLevel: true,
      dailyGoalHours: true,
      createdAt: true,
    },
  });

  // Get today's study sessions
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todaySessions = await prisma.studySession.findMany({
    where: {
      userId: currentUser.userId,
      date: {
        gte: today,
      },
    },
  });

  const todayMinutes = todaySessions.reduce((sum: number, session: any) => sum + session.duration, 0);
  const todayHours = (todayMinutes / 60).toFixed(1);

  // Get total study time
  const allSessions = await prisma.studySession.findMany({
    where: { userId: currentUser.userId },
  });

  const totalMinutes = allSessions.reduce((sum: number, session: any) => sum + session.duration, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Calculate streak (simplified - counts consecutive days with sessions)
  const uniqueDates = new Set(
    allSessions.map((s: any) => s.date.toISOString().split('T')[0])
  );
  const currentStreak = calculateStreak(Array.from(uniqueDates) as string[]);

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Learning <span className="font-semibold text-blue-600">{user.targetLanguage}</span> • Target: <span className="font-semibold text-purple-600">{user.targetLevel}</span>
        </p>
      </div>

      {/* Quick Action */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-shadow animate-slide-in">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ready to study? 🚀</h2>
            <p className="text-white/90 text-lg">
              Log your study session and track your progress
            </p>
          </div>
          <Link href="/study">
            <Button size="lg" variant="secondary" className="text-lg px-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              📚 Start Session
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Today's Progress"
          value={`${todayHours} hrs`}
          subtitle={`Goal: ${user.dailyGoalHours} hrs`}
          progress={parseFloat(todayHours) / user.dailyGoalHours * 100}
          icon="⏱️"
        />
        <StatCard
          title="Current Streak"
          value={`${currentStreak} days`}
          subtitle="Keep it going!"
          icon="🔥"
        />
        <StatCard
          title="Total Hours"
          value={`${totalHours} hrs`}
          subtitle={`${allSessions.length} sessions`}
          icon="📊"
        />
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>Your latest study activities</CardDescription>
          </CardHeader>
          <CardContent>
            {allSessions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">No sessions logged yet!</p>
                <Link href="/study">
                  <Button>Log Your First Session</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {allSessions.slice(0, 5).map((session: any) => {
                  const typeColors: Record<string, string> = {
                    speaking: 'bg-red-50 border-red-200 text-red-700',
                    reading: 'bg-blue-50 border-blue-200 text-blue-700',
                    writing: 'bg-green-50 border-green-200 text-green-700',
                    listening: 'bg-purple-50 border-purple-200 text-purple-700',
                    grammar: 'bg-orange-50 border-orange-200 text-orange-700',
                    vocabulary: 'bg-pink-50 border-pink-200 text-pink-700',
                  };
                  const colorClass = typeColors[session.studyType] || 'bg-gray-50 border-gray-200 text-gray-700';
                  
                  return (
                    <div key={session.id} className={`flex justify-between items-center p-4 rounded-xl border-2 ${colorClass} hover:shadow-md transition-all`}>
                      <div>
                        <p className="font-semibold capitalize">{session.studyType}</p>
                        <p className="text-sm opacity-75">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{session.duration} min</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <QuickLink href="/study" icon="📚" title="Log Study Session" />
              <QuickLink href="/goals" icon="🎯" title="Manage Goals" />
              <QuickLink href="/resources" icon="📖" title="View Resources" />
              <QuickLink href="/tasks" icon="✅" title="Check Tasks" />
              <QuickLink href="/progress" icon="📈" title="View Analytics" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Guide (shows if no sessions) */}
      {allSessions.length === 0 && (
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">🚀 Getting Started</CardTitle>
            <CardDescription className="text-gray-600 font-medium">Follow these steps to make the most of your tracker</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex items-start group">
                <span className="inline-flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold text-white bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">1</span>
                <div>
                  <p className="font-semibold text-lg text-gray-800">Log your first study session</p>
                  <p className="text-sm text-gray-600 mt-1">Click "Start Session" and record your learning time</p>
                </div>
              </li>
              <li className="flex items-start group">
                <span className="inline-flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold text-white bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">2</span>
                <div>
                  <p className="font-semibold text-lg text-gray-800">Add your learning resources</p>
                  <p className="text-sm text-gray-600 mt-1">Keep track of books, videos, and courses you're using</p>
                </div>
              </li>
              <li className="flex items-start group">
                <span className="inline-flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold text-white bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">3</span>
                <div>
                  <p className="font-semibold text-lg text-gray-800">Set your learning goals</p>
                  <p className="text-sm text-gray-600 mt-1">Define daily, weekly, and monthly targets to stay motivated</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatCard({ title, value, subtitle, progress, icon }: {
  title: string;
  value: string;
  subtitle: string;
  progress?: number;
  icon: string;
}) {
  const getGradient = () => {
    if (title.includes('Today')) return 'from-blue-500 to-cyan-500';
    if (title.includes('Streak')) return 'from-orange-500 to-red-500';
    return 'from-purple-500 to-pink-500';
  };

  return (
    <Card className="card-hover border-none shadow-md hover:shadow-xl transition-all">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</h3>
          <span className="text-3xl">{icon}</span>
        </div>
        <p className="text-4xl font-bold gradient-text mb-2">{value}</p>
        <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
        {progress !== undefined && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${getGradient()} h-2.5 rounded-full transition-all duration-500 shadow-sm`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5 text-right">{Math.min(progress, 100).toFixed(0)}%</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function QuickLink({ href, icon, title }: { href: string; icon: string; title: string }) {
  return (
    <Link href={href}>
      <div className="flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all cursor-pointer group border border-transparent hover:border-purple-200 hover:shadow-sm">
        <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{icon}</span>
        <span className="font-semibold text-gray-700 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">{title}</span>
        <span className="ml-auto text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all">→</span>
      </div>
    </Link>
  );
}

function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  
  const sortedDates = dates.sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  
  let streak = 0;
  let currentDate = new Date(today);
  
  for (const dateStr of sortedDates) {
    const checkDate = currentDate.toISOString().split('T')[0];
    
    if (dateStr === checkDate) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}
