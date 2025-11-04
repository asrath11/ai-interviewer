// Moved from app/components/Hero.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <div className='relative overflow-hidden bg-linear-to-b from-background/50 via-background to-background/50'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl pt-20 pb-16 text-center lg:pt-32'>
          <h1 className='text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
            Ace Your Next Interview with AI
          </h1>
          <p className='mx-auto mt-6 max-w-2xl text-lg text-muted-foreground'>
            Practice with our AI interviewer, get instant feedback, and land your
            dream job. Our AI analyzes your responses and provides detailed
            insights to help you improve.
          </p>
          <div className='mt-10 flex justify-center gap-4'>
            <Button asChild size='lg' className='text-lg'>
              <Link href='/sign-up'>
                Get Started <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' className='text-lg' asChild>
              <Link href='/#features'>Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
