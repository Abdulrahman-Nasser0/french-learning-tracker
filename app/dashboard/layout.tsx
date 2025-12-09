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
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
              🇫🇷 French Tracker
            </Link>
            <nav className="hidden md:flex space-x-6">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/study">Log Session</NavLink>
              <NavLink href="/progress">Progress</NavLink>
              <NavLink href="/goals">Goals</NavLink>
              <NavLink href="/resources">Resources</NavLink>
              <NavLink href="/tasks">Tasks</NavLink>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/settings">
              <Button variant="ghost" size="sm">Settings</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
    >
      {children}
    </Link>
  );
}
