'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export function CTA() {
  const { data: session } = useSession();

  return (
    <section className='bg-primary/5 py-20 md:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Ready to Ace Your Next Interview?
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Sign up today and start practicing with our AI-powered interview
            coach.
          </p>
          <div className='mt-8'>
            <Button asChild size='lg'>
              <Link href={session?.user ? '/dashboard' : '/signup'}>
                Get Started for Free
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
