'use client';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Loader2,
  MessageSquare,
  Mic,
  FileText,
  Edit,
  ArrowRight,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getJobInfo } from '@/services/api/jobInfo';
import { Card, CardTitle } from '@/components/ui/card';

const actionItems = [
  {
    title: 'Answer Technical Questions',
    description: 'Practice answering common technical questions for this role',
    href: (id: string) => `/dashboard/job-infos/${id}/questions`,
  },
  {
    title: 'Practice Mock Interview',
    description: 'Simulate a real interview scenario with AI',
    href: (id: string) => `/dashboard/job-infos/${id}/interviews`,
  },
  {
    title: 'Refine Your Resume',
    description: 'Get suggestions to tailor your resume for this job',
    href: (id: string) => `/dashboard/job-infos/${id}/resume`,
  },
  {
    title: 'Update Job Description',
    description: 'Edit or update the job details and requirements',
    href: (id: string) => `/dashboard/job-infos/${id}/edit`,
  },
];

export default function JobInfoPage() {
  const router = useRouter();
  const { jobInfoId } = useParams<{ jobInfoId: string }>();

  const {
    data: jobInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['jobInfo', jobInfoId],
    queryFn: () => getJobInfo(jobInfoId),
    enabled: !!jobInfoId,
  });

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className='h-screen-header flex items-center justify-center'>
        <Loader2 className='h-24 w-24 animate-spin text-primary' />
      </div>
    );
  }

  if (isError || !jobInfo) {
    return (
      <div className='container my-8'>
        <Button variant='ghost' onClick={handleBack} className='mb-6'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back
        </Button>
        <div className='p-6 border rounded-lg'>
          <p>Failed to load job information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='m-8'>
      <div className='flex justify-between items-center mb-6'>
        <Button variant='ghost' onClick={handleBack}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Jobs
        </Button>
      </div>

      <div className='p-6'>
        <div className='mb-6'>
          <div className='flex xl:flex-col gap-2'>
            <div>
              <h2 className='text-2xl md:text-3xl font-semibold'>
                {jobInfo.name}
              </h2>
            </div>
            <div>
              <Badge variant='outline' className='text-sm'>
                {jobInfo.experience}
              </Badge>
            </div>
          </div>
        </div>

        <div className='prose max-w-none mb-12'>{jobInfo.description}</div>

        <div className='grid lg:grid-cols-2  gap-6'>
          {actionItems.map((item, index) => (
            <Card
              key={index}
              className='border rounded-lg p-6 hover:shadow-md transition-shadow'
            >
              <CardTitle className='flex items-center justify-between gap-2'>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-lg font-semibold'>{item.title}</h3>
                  <p className='text-muted-foreground text-sm mb-4'>
                    {item.description}
                  </p>
                </div>
                <Button asChild variant='ghost'>
                  <Link href={item.href(jobInfoId)}>
                    <ArrowRight className='h-4 w-4' />
                  </Link>
                </Button>
              </CardTitle>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
