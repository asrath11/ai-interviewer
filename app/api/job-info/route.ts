import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const JobInfoSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  title: z.string().min(2).optional(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  experience: z.enum(['Entry', 'Mid', 'Senior']),
  userId: z.string().optional(), // Add this if userId is required in POST
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'Missing userId query parameter' },
      { status: 400 }
    );
  }

  const jobInfos = await prisma.jobInfo.findMany({
    where: { userId },
  });

  return NextResponse.json(jobInfos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = JobInfoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const jobInfo = await prisma.jobInfo.create({ data: parsed.data });
  return NextResponse.json(jobInfo, { status: 201 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    // First, check if the job info exists and belongs to the user
    const jobInfo = await prisma.jobInfo.findUnique({
      where: { id },
    });

    if (!jobInfo) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Delete the job info
    await prisma.jobInfo.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error deleting job info:', e);
    return NextResponse.json(
      { error: 'Failed to delete job info' },
      { status: 500 }
    );
  }
}
