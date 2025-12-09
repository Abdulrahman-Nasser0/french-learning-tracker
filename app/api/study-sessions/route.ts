import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { studySessionSchema } from '@/lib/validations/study';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = studySessionSchema.parse(body);

    const session = await prisma.studySession.create({
      data: {
        userId: currentUser.userId,
        date: validatedData.date,
        duration: validatedData.duration,
        studyType: validatedData.studyType,
        notes: validatedData.notes,
        resourceId: validatedData.resourceId,
      },
    });

    return NextResponse.json(
      { message: 'Study session created', session },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Create session error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const sessions = await prisma.studySession.findMany({
      where: { userId: currentUser.userId },
      orderBy: { date: 'desc' },
      take: 50,
      include: {
        resource: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    console.error('Get sessions error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
