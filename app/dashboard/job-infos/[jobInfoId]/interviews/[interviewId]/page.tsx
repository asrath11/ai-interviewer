import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { authOptions } from '@/lib/authoption';

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/signin');

  const { interviewId } = await params;

  const interview = await prisma.interview.findUnique({
    where: { id: interviewId },
  });

  if (!interview || interview.userId !== session.user.id) return notFound();

  return (
    <div className='container my-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>
            Interview on {interview.createdAt.toLocaleString()}
          </h1>
          <p className='text-muted-foreground'>
            Duration: {interview.duration ?? 'N/A'} minutes
          </p>
        </div>

        {interview.feedback ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button>View Feedback</Button>
            </DialogTrigger>
            <DialogContent className='md:max-w-3xl lg:max-w-4xl overflow-y-auto'>
              <DialogTitle>Feedback</DialogTitle>
              <MarkdownRenderer>{interview.feedback}</MarkdownRenderer>
            </DialogContent>
          </Dialog>
        ) : (
          <Button disabled>Generate Feedback</Button>
        )}
      </div>
    </div>
  );
}
