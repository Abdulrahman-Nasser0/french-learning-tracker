'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' });
    router.push('/sign-in');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-md group-hover:shadow-lg transition-all">
                🇫🇷
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:inline">
                French Tracker
              </span>
            </Link>
            <nav className="hidden md:flex space-x-1">
              <NavLink href="/dashboard" icon="📊">Dashboard</NavLink>
              <NavLink href="/study" icon="📚">Log Session</NavLink>
              <NavLink href="/progress" icon="📈">Progress</NavLink>
              <NavLink href="/goals" icon="🎯">Goals</NavLink>
              <NavLink href="/resources" icon="📖">Resources</NavLink>
              <NavLink href="/tasks" icon="✅">Tasks</NavLink>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="hover:bg-purple-50">
                ⚙️ Settings
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              👋 Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 mt-12">
        <p>Keep learning! Bonne chance! 🇫🇷</p>
      </footer>
    </div>
  );
}

function NavLink({ href, icon, children }: { href: string; icon: string; children: ReactNode }) {
  return (
    <Link 
      href={href} 
      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 font-medium transition-all hover:shadow-sm"
    >
      <span>{icon}</span>
      <span>{children}</span>
    </Link>
  );
}
