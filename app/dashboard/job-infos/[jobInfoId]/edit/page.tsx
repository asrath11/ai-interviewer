'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { JobInfoForm } from '@/components/dashboard/job-infos/JobInfoForm';
import { getJobInfo, updateJobInfo } from '@/services/api/jobInfo';

export default function JobInfoEditPage() {
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

  if (isLoading) {
    return (
      <div className='h-screen-header flex items-center justify-center'>
        <Loader2 className='h-24 w-24 animate-spin text-primary' />
      </div>
    );
  }

  if (isError || !jobInfo) {
    return (
      <div className='max-w-5xl space-y-6 m-10'>
        <Link href={`/dashboard/job-infos/${jobInfoId}`}>
          <Button variant={'ghost'} className='mb-2'>
            <ArrowLeft className='text-muted-foreground' />
            <span className='text-muted-foreground'>Back</span>
          </Button>
        </Link>
        <div className='p-6 border rounded-lg'>
          <p>Failed to load job information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-5xl space-y-6 m-10'>
      <Link href={`/dashboard/job-infos/${jobInfoId}`}>
        <Button variant={'ghost'} className='mb-2'>
          <ArrowLeft className='text-muted-foreground' />
          <span className='text-muted-foreground'>Back</span>
        </Button>
      </Link>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl md:text-4xl'>Edit Job Description</h1>
      </div>
      <JobInfoForm
        initialValues={{
          name: jobInfo.name || '',
          experience: jobInfo.experience || 'Entry',
          title: jobInfo.title || '',
          description: jobInfo.description || '',
        }}
        submitLabel='Update Job Info'
        onSubmit={async (data) => {
          await updateJobInfo(jobInfoId, data);
          router.push(`/dashboard/job-infos/${jobInfoId}`);
          router.refresh();
        }}
      />
    </div>
  );
}
