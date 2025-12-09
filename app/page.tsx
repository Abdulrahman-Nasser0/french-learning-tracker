import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <nav className="flex justify-between items-center mb-16 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🇫🇷
            </div>
            <span className="text-2xl font-bold gradient-text">
              French Learning Tracker
            </span>
          </div>
          <div className="flex gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" className="hover:bg-white/50">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg btn-glow">
                Get Started Free
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-24 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            ✨ Master French with Confidence
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Track Your
            <span className="gradient-text"> French Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your all-in-one dashboard to track study sessions, achieve goals, manage resources, 
            and visualize your progress toward <span className="font-semibold text-blue-600">French fluency</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/sign-up">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-10 py-6 shadow-2xl btn-glow text-white">
                🚀 Start Learning Free
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50">
                Sign In →
              </Button>
            </Link>
          </div>
          
          {/* Stats Preview */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="animate-slide-in">
              <div className="text-4xl font-bold text-blue-600">4-5h</div>
              <div className="text-sm text-gray-600">Daily Tracking</div>
            </div>
            <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-purple-600">10mo</div>
              <div className="text-sm text-gray-600">Learning Plans</div>
            </div>
            <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-pink-600">A1-C2</div>
              <div className="text-sm text-gray-600">All Levels</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <FeatureCard
            icon="📚"
            title="Study Session Tracking"
            description="Log your daily study sessions with duration, type, and notes. Never lose track of your progress."
            gradient="from-blue-500 to-blue-600"
            delay="0s"
          />
          <FeatureCard
            icon="📊"
            title="Visual Progress Charts"
            description="See your progress with beautiful charts showing hours studied, skill breakdown, and streaks."
            gradient="from-purple-500 to-purple-600"
            delay="0.1s"
          />
          <FeatureCard
            icon="🎯"
            title="Smart Goals System"
            description="Set daily, weekly, and monthly goals. Track milestones and stay motivated with achievements."
            gradient="from-pink-500 to-pink-600"
            delay="0.2s"
          />
          <FeatureCard
            icon="📖"
            title="Resource Library"
            description="Organize all your learning materials - books, videos, podcasts, courses - in one place."
            gradient="from-indigo-500 to-indigo-600"
            delay="0.3s"
          />
          <FeatureCard
            icon="✅"
            title="Task Management"
            description="Keep track of daily and weekly tasks. Never forget what you need to study next."
            gradient="from-cyan-500 to-cyan-600"
            delay="0.4s"
          />
          <FeatureCard
            icon="🔥"
            title="Streak Tracking"
            description="Build consistency with streak counters. See your longest streak and keep momentum going."
            gradient="from-orange-500 to-orange-600"
            delay="0.5s"
          />
        </div>

        {/* Testimonial / CTA Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mb-48"></div>
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-6">🎓</div>
              <h2 className="text-4xl font-bold mb-4">Ready to Master French?</h2>
              <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                Join thousands of learners tracking their journey to fluency. 
                Start for free and see your progress in real-time.
              </p>
              <Link href="/sign-up">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-6 bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                  Create Your Free Account →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600 py-8 border-t border-gray-200">
          <p className="mb-2">Built with ❤️ for French language learners</p>
          <p className="text-sm">© 2025 French Learning Tracker. Track. Learn. Master.</p>
        </footer>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description, gradient, delay }: { 
  icon: string; 
  title: string; 
  description: string;
  gradient: string;
  delay: string;
}) {
  return (
    <div 
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-fade-in card-hover"
      style={{ animationDelay: delay }}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-md`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

