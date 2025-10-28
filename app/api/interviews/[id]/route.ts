// app/api/interviews/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authoption';
import { prisma } from '@/lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ✅ Await params first, THEN destructure
    const resolvedParams = await params;
    const interviewId = resolvedParams.id;

    const { humeChatId, duration } = await req.json();
    console.log(humeChatId, duration);

    if (!humeChatId) {
      return NextResponse.json(
        { error: 'humeChatId is required' },
        { status: 400 }
      );
    }

    // Ensure user owns this interview
    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!interview || interview.userId !== session.user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Coerce duration to string or null to match Prisma schema (String?)
    const durationValue =
      duration === null || duration === undefined || duration === ''
        ? null
        : String(duration);

    await prisma.interview.update({
      where: { id: interviewId },
      data: { humeChatId, duration: durationValue },
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('PUT Error:', e);
    return NextResponse.json(
      { error: e.message || 'Failed to update interview' },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ✅ Await params first, THEN destructure
    const resolvedParams = await params;
    const interviewId = resolvedParams.id;

    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!interview || interview.userId !== session.user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(interview);
  } catch (e) {
    console.error('GET Error:', e);
    return NextResponse.json(
      { error: 'Failed to fetch interview' },
      { status: 500 }
    );
  }
}
