import { Messages } from '@/components/interview/Messages';
import { getInterview } from '@/services/api/interview';
import { getInterviewMessages } from '@/services/api/message';
import { sampleMessages } from '@/components/interview/sampleMessages';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string; interviewId: string }>;
}) {
  const resolvedParams = await params;
  const interview = await getInterview(resolvedParams.interviewId);
  const createdAt = new Date(interview.createdAt);

  if (!interview.id) {
    throw new Error('No transcript available');
  }

  const messages = await getInterviewMessages(interview.id);
  // const messages = sampleMessages;

  return (
    <div className='h-[calc(100vh-80px)] overflow-y-auto p-6'>
      <div className='mb-6 w-fit'>
        <Button
          asChild
          variant='ghost'
          className='flex items-center gap-2 text-muted-foreground'
        >
          <Link
            href={`/dashboard/job-infos/${resolvedParams.jobInfoId}/interviews`}
          >
            <ArrowLeftIcon className='size-5' />
            All Interviews
          </Link>
        </Button>
      </div>
      <p className='text-2xl font-semibold mb-6'>
        Interview:{' '}
        <span className='text-muted-foreground'>
          {createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <span className='text-muted-foreground ml-2'>
          {createdAt.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </span>
      </p>

      <Messages messages={messages} />
    </div>
  );
}
