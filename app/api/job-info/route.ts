import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const jobInfos = await prisma.jobInfo.findMany();
  return NextResponse.json(jobInfos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const jobInfo = await prisma.jobInfo.create({ data: body });
  return NextResponse.json(jobInfo);
}
