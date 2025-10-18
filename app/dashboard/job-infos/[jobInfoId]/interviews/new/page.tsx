'use client';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewInterview() {
  const router = useRouter();
  const params = useParams();
  const jobInfoId = (params?.jobInfoId as string) || '';
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    if (!jobInfoId) return;
    try {
      setLoading(true);
      const res = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jobInfoId }),
      });
      if (!res.ok) {
        if (res.status === 401) {
          const callback = encodeURIComponent(
            `/dashboard/job-infos/${jobInfoId}/interviews/new`
          );
          router.push(`/signin?callbackUrl=${callback}`);
          return;
        }
        const body = await res.text();
        console.error('Failed to create interview', body);
        return;
      }
      const data = (await res.json()) as { id: string };
      router.push(`/dashboard/job-infos/${jobInfoId}/interviews/${data.id}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex justify-center items-center h-screen'>
      <Button disabled={loading || !jobInfoId} onClick={startInterview}>
        {loading ? 'Starting…' : 'Start Interview'}
      </Button>
    </div>
  );
}
