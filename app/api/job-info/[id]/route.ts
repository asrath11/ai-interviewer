import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
