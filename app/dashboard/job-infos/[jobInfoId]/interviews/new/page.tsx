'use client';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function NewInterview() {
  const router = useRouter();
  const params = useParams();
  const jobInfoId = (params?.jobInfoId as string) || '';
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    if (!jobInfoId) return;
    try {
      setLoading(true);
      const res = await axios.post('/api/interviews', { jobInfoId });
      const data = res.data as { id: string };
      router.push(`/dashboard/job-infos/${jobInfoId}/interviews/${data.id}`);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401) {
        const callback = encodeURIComponent(
          `/dashboard/job-infos/${jobInfoId}/interviews/new`
        );
        router.push(`/signin?callbackUrl=${callback}`);
        return;
      }
      // Optional: log error
      console.error('Failed to create interview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
      <Button disabled={loading || !jobInfoId} onClick={startInterview}>
        {loading ? 'Starting…' : 'Start Interview'}
      </Button>
    </div>
  );
}
