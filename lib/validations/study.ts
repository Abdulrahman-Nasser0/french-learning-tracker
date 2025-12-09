import { z } from 'zod';

export const studySessionSchema = z.object({
  date: z.date(),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  studyType: z.enum(['speaking', 'reading', 'writing', 'listening', 'grammar', 'vocabulary']),
  notes: z.string().optional(),
  resourceId: z.string().optional(),
});

export const resourceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
  type: z.enum(['video', 'podcast', 'book', 'course', 'app', 'website', 'other']),
  description: z.string().optional(),
  status: z.enum(['active', 'completed']).default('active'),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: z.enum(['daily', 'weekly', 'backlog']),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  dueDate: z.date().optional(),
});

export const goalSchema = z.object({
  type: z.enum(['daily', 'weekly', 'monthly', 'milestone']),
  title: z.string().min(1, 'Title is required'),
  targetValue: z.number().min(0.1),
  startDate: z.date(),
  endDate: z.date(),
});

export type StudySessionInput = z.infer<typeof studySessionSchema>;
export type ResourceInput = z.infer<typeof resourceSchema>;
export type TaskInput = z.infer<typeof taskSchema>;
export type GoalInput = z.infer<typeof goalSchema>;
