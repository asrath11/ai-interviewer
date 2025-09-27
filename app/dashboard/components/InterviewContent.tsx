'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
interface InterviewData {
  id: string;
  title: string;
  description?: string;
  // Add other interview-related fields as needed
}

export default function InterviewContent() {
  const { jobInfoId } = useParams<{ jobInfoId: string }>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [interview, setInterview] = useState<InterviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/job-info/${jobInfoId}/interviews`);

        if (!response.ok) {
          throw new Error('Failed to fetch interview data');
        }

        const data = await response.json();
        setInterview(data);
      } catch (err) {
        console.error('Error fetching interview:', err);
        setError('Failed to load interview data');
      } finally {
        setIsLoading(false);
      }
    };

    if (jobInfoId) {
      fetchInterviewData();
    }
  }, [jobInfoId]);

  const handleBack = () => {
    router.push(`/dashboard/job-infos/${jobInfoId}`);
  };

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-12 w-64' />
        <Skeleton className='h-6 w-48' />
        <Skeleton className='h-32 w-full' />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      <Button variant='ghost' onClick={handleBack} className='mb-4'>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back to Job Details
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Interview Details</CardTitle>
          {interview?.description && (
            <CardDescription>{interview.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className='space-y-4'>
          {interview ? (
            <div>
              <h2 className='text-xl font-semibold'>{interview.title}</h2>
              {/* Add more interview details here */}
            </div>
          ) : (
            <p>No interview data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
