import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authoption';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !('id' in session.user) || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const jobInfoId = body?.jobInfoId as string | undefined;
    if (!jobInfoId) {
      return NextResponse.json({ error: 'jobInfoId is required' }, { status: 400 });
    }

    const interview = await prisma.interview.create({
      data: {
        jobInfoId,
        userId: session.user.id as string,
      },
      select: { id: true },
    });

    return NextResponse.json(interview, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create interview' }, { status: 500 });
  }
}
