import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const JobInfoSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  title: z.string().min(2).optional(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  experience: z.enum(['Entry', 'Mid', 'Senior']),
});

export async function GET() {
  const jobInfos = await prisma.jobInfo.findMany();
  return NextResponse.json(jobInfos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = JobInfoSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ error: parsedBody.error }, { status: 400 });
  }
  const jobInfo = await prisma.jobInfo.create({ data: body });
  return NextResponse.json(jobInfo);
}
