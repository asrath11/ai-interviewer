'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function InterviewContent() {
  const { jobInfoId } = useParams<{ jobInfoId: string }>();
  const router = useRouter();

  const handleBack = () => {
    router.push(`/dashboard/job-infos/${jobInfoId}`);
  };

  return (
    <div className='space-y-6 m-8'>
      <Button variant='ghost' onClick={handleBack} className='mb-4'>
        <ArrowLeft className='h-4 w-4' />
        Back to Job Details
      </Button>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-semibold'>Interviews</h1>
        <Button asChild>
          <Link href={`/dashboard/job-infos/${jobInfoId}/interviews/new`}>
            <Plus className='h-4 w-4 mr-2' />
            New Interview
          </Link>
        </Button>
      </div>
    </div>
  );
}
