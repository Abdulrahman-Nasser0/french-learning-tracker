'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { studySessionSchema, type StudySessionInput } from '@/lib/validations/study';

const studyTypes = [
  { value: 'speaking', label: '🗣️ Speaking', color: 'bg-gradient-to-br from-red-500 to-orange-500 text-white', border: 'border-red-500' },
  { value: 'reading', label: '📖 Reading', color: 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white', border: 'border-blue-500' },
  { value: 'writing', label: '✍️ Writing', color: 'bg-gradient-to-br from-green-500 to-emerald-500 text-white', border: 'border-green-500' },
  { value: 'listening', label: '🎧 Listening', color: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white', border: 'border-purple-500' },
  { value: 'grammar', label: '📝 Grammar', color: 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white', border: 'border-orange-500' },
  { value: 'vocabulary', label: '📚 Vocabulary', color: 'bg-gradient-to-br from-pink-500 to-rose-500 text-white', border: 'border-pink-500' },
];

export default function StudyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StudySessionInput>({
    resolver: zodResolver(studySessionSchema),
    defaultValues: {
      date: new Date(),
      duration: 30,
      studyType: 'reading',
      notes: '',
    },
  });

  const selectedType = watch('studyType');

  const onSubmit = async (data: StudySessionInput) => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/study-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to log session');
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      reset({
        date: new Date(),
        duration: 30,
        studyType: 'reading',
        notes: '',
      });

      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 1500);
    } catch (err) {
      setError('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold gradient-text mb-2">Log Study Session 📚</h1>
        <p className="text-gray-600 text-lg">Track your learning progress by logging your study time</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="shadow-xl border-none">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="text-2xl">Session Details</CardTitle>
            <CardDescription className="text-base">Fill in the details of your study session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl font-medium shadow-sm">
                ❌ {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-2 border-green-300 text-green-700 px-4 py-3 rounded-xl font-medium shadow-sm animate-fade-in">
                ✅ Session logged successfully! Redirecting to dashboard...
              </div>
            )}

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                {...register('date', { 
                  setValueAs: (v) => v ? new Date(v) : new Date() 
                })}
                defaultValue={new Date().toISOString().split('T')[0]}
                disabled={isLoading}
              />
              {errors.date && (
                <p className="text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <div className="flex gap-2">
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  step="1"
                  {...register('duration', { valueAsNumber: true })}
                  disabled={isLoading}
                  className="flex-1"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setValue('duration', 30)}
                    disabled={isLoading}
                    className="hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 font-semibold"
                  >
                    30 min
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setValue('duration', 60)}
                    disabled={isLoading}
                    className="hover:bg-purple-50 hover:border-purple-400 hover:text-purple-700 font-semibold"
                  >
                    1 hr
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setValue('duration', 120)}
                    disabled={isLoading}
                    className="hover:bg-pink-50 hover:border-pink-400 hover:text-pink-700 font-semibold"
                  >
                    2 hrs
                  </Button>
                </div>
              </div>
              {errors.duration && (
                <p className="text-sm text-red-600">{errors.duration.message}</p>
              )}
            </div>

            {/* Study Type */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Study Type</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {studyTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setValue('studyType', type.value as any)}
                    disabled={isLoading}
                    className={`p-4 rounded-xl border-2 text-left transition-all transform hover:scale-105 ${
                      selectedType === type.value
                        ? `${type.border} shadow-lg scale-105`
                        : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className={`inline-block px-3 py-1.5 rounded-lg text-sm font-bold shadow-md ${type.color}`}>
                      {type.label}
                    </div>
                    {selectedType === type.value && (
                      <div className="mt-2 text-xs font-semibold text-gray-600">✓ Selected</div>
                    )}
                  </button>
                ))}
              </div>
              {errors.studyType && (
                <p className="text-sm text-red-600">{errors.studyType.message}</p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <textarea
                id="notes"
                {...register('notes')}
                disabled={isLoading}
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="What did you study? What did you learn? Any challenges?"
              />
              {errors.notes && (
                <p className="text-sm text-red-600">{errors.notes.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <Button
            type="submit"
            size="lg"
            disabled={isLoading || success}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            {isLoading ? '⏳ Logging...' : success ? '✅ Logged!' : '📚 Log Session'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.push('/dashboard')}
            disabled={isLoading}
            className="hover:bg-gray-50 font-semibold"
          >
            Cancel
          </Button>
        </div>
      </form>

      {/* Quick Tips */}
      <Card className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl gradient-text">💡 Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-700 space-y-2.5 font-medium">
          <p className="flex items-start">
            <span className="text-blue-600 mr-2 text-lg">•</span>
            <span>Log sessions immediately after studying for accuracy</span>
          </p>
          <p className="flex items-start">
            <span className="text-purple-600 mr-2 text-lg">•</span>
            <span>Use notes to track what worked well or what needs improvement</span>
          </p>
          <p className="flex items-start">
            <span className="text-pink-600 mr-2 text-lg">•</span>
            <span>Consistent tracking helps you identify your learning patterns</span>
          </p>
          <p className="flex items-start">
            <span className="text-indigo-600 mr-2 text-lg">•</span>
            <span>Try to balance different study types for well-rounded progress</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
