'use client';
import { JobInfoForm } from './components/JobInfoForm';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export default function DashboardPage() {
  const router = useRouter();
  return (
    <>
      <div className='flex justify-between items-center p-8'>
        <h1 className='text-3xl'>Select a job description</h1>
        <Button
          className='font-bold text-md'
          onClick={() => router.push('/dashboard/job-infos/new')}
        >
          <PlusIcon />
          Create Job Description
        </Button>
      </div>
    </>
  );
}
