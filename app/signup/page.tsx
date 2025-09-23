'use client';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/passwordInput';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import SocialAuth from '@/components/socialAuth';

interface SignupProps {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Signup = ({
  heading = 'Signup',
  buttonText = 'Create Account',
  signupText = 'Already a user?',
  signupUrl = '/signin',
}: SignupProps) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const signupHandler = async function () {
    try {
      const response = await axios.post('/api/auth/signup', data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const googleHandler = async function () {
    try {
      const response = await signIn('google');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className='bg-muted h-screen'>
      <div className='flex h-full items-center justify-center'>
        <div className='flex flex-col items-center gap-6 lg:justify-start'>
          <div className='min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md'>
            {heading && <h1 className='text-xl font-semibold'>{heading}</h1>}
            <div className='flex w-full flex-col gap-2'>
              <Label>Email</Label>
              <Input
                type='email'
                placeholder='Email'
                className='text-sm'
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className='flex w-full flex-col gap-2'>
              <Label>Password</Label>
              <PasswordInput
                placeholder='Password'
                className='text-sm'
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className='flex w-full flex-col gap-2'>
              <Label>Confirm Password</Label>
              <PasswordInput
                placeholder='Confirm Password'
                className='text-sm'
                value={data.confirmPassword}
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
              />
            </div>
            <Button type='submit' className='w-full' onClick={signupHandler}>
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
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
