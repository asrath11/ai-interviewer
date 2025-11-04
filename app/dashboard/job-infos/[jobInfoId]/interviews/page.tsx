import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authoption';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Loader2 as Loader2Icon } from 'lucide-react';
import InterviewHeader from '@/components/dashboard/interviews/InterviewHeader';
import InterviewsList from '@/components/dashboard/interviews/InterviewsList';

export default async function InterviewPage({
  params,
}: {
  params: { jobInfoId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/signin');

  const { jobInfoId } = await params;

  const interviews = await prisma.interview.findMany({
    where: { userId: session.user.id, jobInfoId: jobInfoId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className='container mx-auto my-6 space-y-6'>
      <Suspense
        fallback={
          <div className='flex justify-center items-center h-24'>
            <Loader2Icon className='animate-spin h-6 w-6 text-gray-400' />
          </div>
        }
      >
        <InterviewHeader />
      </Suspense>

      <InterviewsList interviews={interviews} />
    </div>
  );
}
