'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

import { getJobInfo } from '@/services/api/jobInfo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';

const actionItems = [
  {
    title: 'Answer Technical Questions',
    description: 'Practice answering common technical questions for this role.',
    href: (id: string) => `/dashboard/job-infos/${id}/questions`,
  },
  {
    title: 'Practice Mock Interview',
    description: 'Simulate a real interview scenario with AI assistance.',
    href: (id: string) => `/dashboard/job-infos/${id}/interviews`,
  },
  {
    title: 'Refine Your Resume',
    description: 'Get AI suggestions to tailor your resume for this job.',
    href: (id: string) => `/dashboard/job-infos/${id}/resume`,
  },
  {
    title: 'Update Job Description',
    description: 'Edit or update the job details and requirements.',
    href: (id: string) => `/dashboard/job-infos/${id}/edit`,
  },
];

export default function JobInfoPage() {
  const router = useRouter();
  const { jobInfoId } = useParams<{ jobInfoId: string }>();
  const { status } = useSession();

  const {
    data: jobInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['jobInfo', jobInfoId],
    queryFn: () => getJobInfo(jobInfoId),
    enabled: !!jobInfoId,
  });
  // Redirect unauthenticated users
  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  const handleBack = () => router.push('/dashboard');

  if (isLoading) {
    return (
      <div className='h-screen-header flex items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-primary' />
      </div>
    );
  }

  if (isError || !jobInfo) {
    return (
      <div className='p-8'>
        <Button variant='ghost' onClick={handleBack} className='mb-6'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Dashboard
        </Button>
        <div className='p-6 border rounded-lg text-center text-muted-foreground'>
          <p>⚠️ Failed to load job information. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-8 space-y-8'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <Button variant='ghost' onClick={handleBack}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Dashboard
        </Button>
      </div>

      {/* Job Info */}
      <div>
        <div className='flex flex-wrap items-center gap-3 mb-4'>
          <h2 className='text-2xl md:text-3xl font-semibold'>{jobInfo.name}</h2>
          <Badge variant='outline' className='text-sm'>
            {jobInfo.experience}
          </Badge>
        </div>
        <p className='text-muted-foreground leading-relaxed'>
          {jobInfo.description}
        </p>
      </div>

      {/* Actions */}
      <div className='grid gap-6 sm:grid-cols-2'>
        {actionItems.map((item, index) => (
          <Card
            key={index}
            className='group border rounded-xl p-6 transition hover:shadow-lg hover:border-primary/50'
          >
            <CardTitle className='flex items-center justify-between'>
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold'>{item.title}</h3>
                <p className='text-sm text-muted-foreground'>
                  {item.description}
                </p>
              </div>
              <Button
                asChild
                variant='ghost'
                size='icon'
                className='transition-transform group-hover:translate-x-1'
              >
                <Link href={item.href(jobInfoId)}>
                  <ArrowRight className='h-5 w-5' />
                </Link>
              </Button>
            </CardTitle>
          </Card>
        ))}
      </div>
    </div>
  );
}
