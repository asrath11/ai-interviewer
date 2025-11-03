'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { JobDescriptionCard } from './components/JobDescriptionCard';

type JobInfo = {
  id: string;
  name: string;
  title?: string;
  experience: 'Entry' | 'Mid' | 'Senior';
  description: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [jobInfos, setJobInfos] = useState<JobInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status, router]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchJobInfos = async () => {
      try {
        const response = await fetch(`/api/job-info?userId=${session.user.id}`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobInfos(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobInfos();
  }, [session?.user?.id]);

  if (isLoading || status === 'loading') {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8 space-y-8'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
          Job Descriptions
        </h1>
        <Button onClick={() => router.push('/dashboard/job-infos/new')}>
          <Plus className='h-5 w-5 mr-2' />
          Create Job Description
        </Button>
      </div>

      {/* Content */}
      {jobInfos.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-xl text-center'>
          <p className='text-muted-foreground mb-4 text-sm md:text-base'>
            You haven’t created any job descriptions yet.
          </p>
          <Button onClick={() => router.push('/dashboard/job-infos/new')}>
            <Plus className='h-4 w-4 mr-2' />
            Create your first one
          </Button>
        </div>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {jobInfos.map((job) => (
            <JobDescriptionCard key={job.id} {...job} />
          ))}
        </div>
      )}
    </div>
  );
}
