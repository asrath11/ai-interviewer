import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const Token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!Token) {
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

    if (!interview || interview.userId !== Token.id) {
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
  } catch (error: unknown) {
    console.error('PUT Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update interview';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // if (!token) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // ✅ Await params first, THEN destructure
    const resolvedParams = await params;
    const interviewId = resolvedParams.id;

    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!interview) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(interview);
  } catch (error: unknown) {
    console.error('GET Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch interview';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
