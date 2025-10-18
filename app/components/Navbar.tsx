'use client';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { BrainCircuitIcon } from 'lucide-react';
import NavButton from './NavButton';
import Link from 'next/link';
import { ToggleTheme } from '@/components/ToggleTheme';

export default function Navbar() {
  return (
    <nav className='border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 px-16'>
      <div>
        <div className='flex justify-between items-center h-16'>
          {/* Left: Logo */}
          <Link href='/' className='flex items-center gap-2'>
            <BrainCircuitIcon className='size-8 text-primary' />
            <h1 className='text-2xl font-bold text-foreground'>Landr</h1>
          </Link>

          {/* Right: Nav + Theme */}
          <div className='flex items-center gap-4'>
            <Suspense
              fallback={
                <Button variant='outline' onClick={() => signIn()}>
                  Sign In
                </Button>
              }
            >
              <NavButton />
            </Suspense>
            <ToggleTheme />
          </div>
        </div>
      </div>
    </nav>
  );
}
