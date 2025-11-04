import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobInfo = await prisma.jobInfo.findUnique({
      where: { id },
    });

    if (!jobInfo) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(jobInfo);
  } catch (error) {
    console.error('Error fetching job info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job info' },
      { status: 500 }
    );
  }
}

const JobInfoSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  title: z.string().min(2).optional(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  experience: z.enum(['Entry', 'Mid', 'Senior']),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validation = JobInfoSchema.safeParse(body);
    if (!validation.success) {
      const errorMessage = validation.error.message || 'Invalid request body';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const validatedData = validation.data;

    // Check if job exists
    const existingJob = await prisma.jobInfo.findUnique({
      where: { id },
    });

    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Update the job
    const updated = await prisma.jobInfo.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

// FIXED: Add the request parameter even if not used
export async function DELETE(
  request: NextRequest, // Add this parameter
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // First, check if the job info exists
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

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting job info:', error);
    return NextResponse.json(
      { error: 'Failed to delete job info' },
      { status: 500 }
    );
  }
}
