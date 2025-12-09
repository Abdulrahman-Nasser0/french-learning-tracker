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
  { value: 'speaking', label: '🗣️ Speaking', color: 'bg-red-100 text-red-700' },
  { value: 'reading', label: '📖 Reading', color: 'bg-blue-100 text-blue-700' },
  { value: 'writing', label: '✍️ Writing', color: 'bg-green-100 text-green-700' },
  { value: 'listening', label: '🎧 Listening', color: 'bg-purple-100 text-purple-700' },
  { value: 'grammar', label: '📝 Grammar', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'vocabulary', label: '📚 Vocabulary', color: 'bg-pink-100 text-pink-700' },
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Log Study Session</h1>
        <p className="text-gray-600">Track your learning progress by logging your study time</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
            <CardDescription>Fill in the details of your study session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
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
                  >
                    30 min
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setValue('duration', 60)}
                    disabled={isLoading}
                  >
                    1 hr
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setValue('duration', 120)}
                    disabled={isLoading}
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
              <Label>Study Type</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {studyTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setValue('studyType', type.value as any)}
                    disabled={isLoading}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedType === type.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`inline-block px-2 py-1 rounded text-sm font-medium mb-2 ${type.color}`}>
                      {type.label}
                    </div>
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
            className="flex-1"
          >
            {isLoading ? 'Logging...' : success ? 'Logged!' : '📚 Log Session'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.push('/dashboard')}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>

      {/* Quick Tips */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">💡 Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• Log sessions immediately after studying for accuracy</p>
          <p>• Use notes to track what worked well or what needs improvement</p>
          <p>• Consistent tracking helps you identify your learning patterns</p>
          <p>• Try to balance different study types for well-rounded progress</p>
        </CardContent>
      </Card>
    </div>
  );
}
