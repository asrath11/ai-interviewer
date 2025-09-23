'use client';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { BrainCircuitIcon } from 'lucide-react';
import NavButton from './NavButton';

export default function Navbar() {
  return (
    <nav className='border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 px-16'>
      <div className='container'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center gap-2'>
            <BrainCircuitIcon className='size-8 text-primary' />
            <h1 className='text-2xl font-bold text-foreground'>Landr</h1>
          </div>
          <Suspense
            fallback={
              <Button variant='outline' onClick={() => signIn()}>
                Sign In
              </Button>
            }
          >
            <NavButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
