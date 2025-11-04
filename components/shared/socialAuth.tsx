'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const googleHandler = () => {
  signIn('google');
};

export function SocialAuth() {
  return (
    <>
      <div className='flex items-center w-full gap-2 my-4'>
        <div className='flex-1 h-px bg-muted' />
        <span className='text-xs uppercase text-muted-foreground'>OR</span>
        <div className='flex-1 h-px bg-muted' />
      </div>
      <Button className='w-full' variant='secondary' onClick={googleHandler}>
        <Image
          src='/google.svg'
          alt='Google logo'
          width={16}
          height={16}
          className='mr-2'
        />
        Continue with Google
      </Button>
    </>
  );
}
