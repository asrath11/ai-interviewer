import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const jobInfo = await prisma.jobInfo.findUnique({
    where: { id: id },
  });

  if (!jobInfo) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json(jobInfo);
}

const JobInfoSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  title: z.string().min(2).optional(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  experience: z.enum(['Entry', 'Mid', 'Senior']),
});

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsedBody = JobInfoSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ error: parsedBody.error }, { status: 400 });
  }

  try {
    const updated = await prisma.jobInfo.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }
}
