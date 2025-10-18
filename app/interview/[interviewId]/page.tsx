import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

export default async function InterviewEntry({
  params,
}: {
  params: { interviewId: string };
}) {
  const interview = await prisma.interview.findUnique({
    where: { id: params.interviewId },
    select: { id: true, jobInfoId: true },
  });

  if (!interview) return notFound();

  redirect(`/dashboard/job-infos/${interview.jobInfoId}/interviews/${interview.id}`);
}
