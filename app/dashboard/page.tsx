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

  const todayMinutes = todaySessions.reduce((sum, session) => sum + session.duration, 0);
  const todayHours = (todayMinutes / 60).toFixed(1);

  // Get total study time
  const allSessions = await prisma.studySession.findMany({
    where: { userId: currentUser.userId },
  });

  const totalMinutes = allSessions.reduce((sum, session) => sum + session.duration, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Calculate streak (simplified - counts consecutive days with sessions)
  const uniqueDates = new Set(
    allSessions.map(s => s.date.toISOString().split('T')[0])
  );
  const currentStreak = calculateStreak(Array.from(uniqueDates));

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Learning {user.targetLanguage} • Target: {user.targetLevel}
        </p>
      </div>

      {/* Quick Action */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to study?</h2>
            <p className="text-indigo-100">
              Log your study session and track your progress
            </p>
          </div>
          <Link href="/study">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              📚 Log Study Session
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
                {allSessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium capitalize">{session.studyType}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(session.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-indigo-600">{session.duration} min</p>
                    </div>
                  </div>
                ))}
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
        <Card className="border-2 border-indigo-200 bg-indigo-50">
          <CardHeader>
            <CardTitle className="text-indigo-900">🚀 Getting Started</CardTitle>
            <CardDescription>Follow these steps to make the most of your tracker</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-white bg-indigo-600 rounded-full flex-shrink-0">1</span>
                <div>
                  <p className="font-medium">Log your first study session</p>
                  <p className="text-sm text-gray-600">Click "Log Study Session" and record your learning time</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-white bg-indigo-600 rounded-full flex-shrink-0">2</span>
                <div>
                  <p className="font-medium">Add your learning resources</p>
                  <p className="text-sm text-gray-600">Keep track of books, videos, and courses you're using</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-white bg-indigo-600 rounded-full flex-shrink-0">3</span>
                <div>
                  <p className="font-medium">Set your learning goals</p>
                  <p className="text-sm text-gray-600">Define daily, weekly, and monthly targets to stay motivated</p>
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
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <span className="text-2xl">{icon}</span>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
        {progress !== undefined && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function QuickLink({ href, icon, title }: { href: string; icon: string; title: string }) {
  return (
    <Link href={href}>
      <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
        <span className="text-2xl mr-3">{icon}</span>
        <span className="font-medium text-gray-700 group-hover:text-indigo-600">{title}</span>
        <span className="ml-auto text-gray-400">→</span>
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
