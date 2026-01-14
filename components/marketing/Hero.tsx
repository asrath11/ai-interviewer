// Moved from app/components/Hero.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export function Hero() {
  const { data: session } = useSession();
  return (
    <section className='relative overflow-hidden py-20 md:py-32'>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-gradient-to-b from-primary/5 via-background/30 to-background'
      />      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
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
              <Link href={session?.user ? '/dashboard' : '/signin'}>
                Get Started <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' className='text-lg' asChild>
              <Link href='/#features'>Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
