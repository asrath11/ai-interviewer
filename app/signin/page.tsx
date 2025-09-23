'use client';
import { useState } from 'react';
import { PasswordInput } from '@/components/passwordInput';
import SocialAuth from '@/components/socialAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
interface SigninProps {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Signin = ({
  heading = 'Login',
  buttonText = 'Login',
  signupText = 'Need an account?',
  signupUrl = '/signup',
}: SigninProps) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const handleSignIn = async () => {
    try {
      const user = await signIn('credentials', {
        email: data.email,
        password: data.password,
      });
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className='bg-muted h-screen'>
      <div className='flex h-full items-center justify-center'>
        {/* Logo */}
        <div className='flex flex-col items-center gap-6 lg:justify-start'>
          <div className='min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md'>
            {heading && <h1 className='text-xl font-semibold'>{heading}</h1>}
            <Input
              type='email'
              placeholder='Email'
              className='text-sm'
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <PasswordInput
              placeholder='Password'
              className='text-sm'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <Button type='submit' className='w-full' onClick={handleSignIn}>
              {buttonText}
            </Button>
            <SocialAuth />
          </div>
          <div className='text-muted-foreground flex justify-center gap-1 text-sm'>
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className='text-primary font-medium hover:underline'
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
