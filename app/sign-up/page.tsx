'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { signUpSchema, type SignUpInput } from '@/lib/validations/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema) as any,
    defaultValues: {
      targetLanguage: 'French',
      targetLevel: 'A1',
      dailyGoalHours: 4,
    },
  });

  const onSubmit = async (data: SignUpInput) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl">
              🇫🇷
            </div>
            <span className="text-3xl font-bold gradient-text">
              French Tracker
            </span>
          </div>
        </div>
        
        <Card className="w-full shadow-2xl border-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-bold text-center text-gray-900">Create Your Account</CardTitle>
            <CardDescription className="text-center text-base">
              Start tracking your French learning journey today 🎯
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  {...register('name')}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  {...register('password')}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetLevel">Starting Level</Label>
                <select
                  id="targetLevel"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...register('targetLevel')}
                  disabled={isLoading}
                >
                  <option value="A1">A1 - Beginner</option>
                  <option value="A2">A2 - Elementary</option>
                  <option value="B1">B1 - Intermediate</option>
                  <option value="B2">B2 - Upper Intermediate</option>
                  <option value="C1">C1 - Advanced</option>
                  <option value="C2">C2 - Proficient</option>
                </select>
                {errors.targetLevel && (
                  <p className="text-sm text-red-600">{errors.targetLevel.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailyGoalHours">Daily Goal (hours)</Label>
                <Input
                  id="dailyGoalHours"
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="24"
                  {...register('dailyGoalHours', { valueAsNumber: true })}
                  disabled={isLoading}
                />
                {errors.dailyGoalHours && (
                  <p className="text-sm text-red-600">{errors.dailyGoalHours.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg py-6 text-base font-semibold btn-glow" 
                disabled={isLoading}
              >
                {isLoading ? '⏳ Creating account...' : '🚀 Create Account'}
              </Button>
              <p className="text-sm text-center text-gray-600">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-blue-600 hover:text-purple-600 font-semibold transition-colors">
                  Sign in →
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
