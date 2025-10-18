import { Suspense } from 'react';
import InterviewContent from '@/app/dashboard/components/InterviewContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authoption';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, Loader2Icon } from 'lucide-react';

export default async function InterviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/signin');

  const interviews = await prisma.interview.findMany({
    where: { userId: session.user.id },
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
        <InterviewContent />
      </Suspense>

      {/* Interview List */}
      <div className='space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2'>
        {interviews.map((interview) => (
          <Card key={interview.id} className='p-6'>
            <div className='flex justify-between items-center'>
              {/* Left side: Interview details */}
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  <span className='font-medium'>
                    {interview.createdAt.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className='text-muted-foreground'>
                    {interview.createdAt.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Clock className='h-4 w-4' />
                  <span>{interview.duration || '00:00:00'}</span>
                </div>
              </div>

              {/* Right side: View button */}
              <Button variant='outline' className='flex items-center gap-2'>
                View
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </Card>
        ))}

        {interviews.length === 0 && (
          <Card className='p-8 text-center'>
            <p className='text-muted-foreground'>
              No interviews found. Start a new interview to see it here.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
