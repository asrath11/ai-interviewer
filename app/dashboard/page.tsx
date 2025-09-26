'use client';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { JobDescriptionCard } from './components/JobDescriptionCard';
import { useState, useEffect } from 'react';

type JobInfo = {
  id: string;
  name: string;
  title?: string;
  experience: 'Entry' | 'Mid' | 'Senior';
  description: string;
};

export default function DashboardPage() {
  const router = useRouter();
  // Mock data - replace with actual data fetching
  const [jobInfos, setJobInfos] = useState<JobInfo[]>([]);
  useEffect(() => {
    const fetchJobInfos = async () => {
      const response = await fetch('/api/job-info');
      const data = await response.json();
      setJobInfos(data);
    };
    fetchJobInfos();
  }, []);
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Job Descriptions</h1>
        <Button onClick={() => router.push('/dashboard/job-infos/new')}>
          <PlusIcon className='h-5 w-5 mr-2' />
          Create Job Description
        </Button>
      </div>

      {jobInfos.length === 0 ? (
        <div className='text-center py-12 border-2 border-dashed rounded-lg'>
          <p className='text-gray-500 mb-4'>No job descriptions found</p>
          <Button onClick={() => router.push('/dashboard/job-infos/new')}>
            Create your first job description
          </Button>
        </div>
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {jobInfos.map((job) => (
            <JobDescriptionCard key={job.id} {...job} />
          ))}
        </div>
      )}
    </div>
  );
}
