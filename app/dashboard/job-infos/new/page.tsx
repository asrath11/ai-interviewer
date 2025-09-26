'use client';
import Link from 'next/link';
import { JobInfoForm } from '../../components/JobInfoForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function JobInfoNewPage() {
  return (
    <div className='max-w-5xl space-y-6 m-10'>
      <Link href='/dashboard'>
        <Button variant={'ghost'} className='mb-2'>
          <ArrowLeft className='text-muted-foreground' />
          <span className='text-muted-foreground'>Dashboard</span>
        </Button>
      </Link>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl md:text-4xl'>Create New Job Description</h1>
      </div>
      <JobInfoForm />
    </div>
  );
}
