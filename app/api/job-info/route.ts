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
