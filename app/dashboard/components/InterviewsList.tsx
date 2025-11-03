import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

type Interview = {
  id: string;
  createdAt: Date;
  duration: string | null;
  jobInfoId: string;
};

export default function InterviewsList({
  interviews,
}: {
  interviews: Interview[];
}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {interviews.map((interview) => (
        <Card key={interview.id} className='p-6 h-full'>
          <div className='flex justify-between items-center h-full'>
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
                <span>{interview.duration || '00:00:00'} </span>
              </div>
            </div>

            <Button asChild variant='outline' className='flex items-center gap-2'>
              <Link
                href={`/dashboard/job-infos/${interview.jobInfoId}/interviews/${interview.id}`}
              >
                View <ArrowRight className='h-4 w-4' />
              </Link>
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
  );
}
