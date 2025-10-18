import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authoption';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !('id' in session.user) || !session.user.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));
    const jobInfoId = body?.jobInfoId as string | undefined;
    if (!jobInfoId) {
      return new Response(JSON.stringify({ error: 'jobInfoId is required' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const interview = await prisma.interview.create({
      data: {
        jobInfoId,
        userId: session.user.id as string,
      },
      select: { id: true },
    });

    return new Response(JSON.stringify(interview), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to create interview' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
