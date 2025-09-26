'use client';

import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/passwordInput';
import SocialAuth from '@/components/socialAuth';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { Info } from 'lucide-react';

// ✅ Validation schema
const signinSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address')
    .refine((val) => !/\s/.test(val), 'Email cannot contain spaces'),
  password: z
    .string()
    .nonempty('Password is required')
    .refine((val) => !/\s/.test(val), 'Password cannot contain spaces'),
});

type SigninFormValues = z.infer<typeof signinSchema>;

interface SigninProps {
  heading?: string;
  logo?: {
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
  const [error, setError] = useState('');
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched', // show errors after field is touched
  });

  const onSubmit = async (values: SigninFormValues) => {
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      console.log(res);
      if (res?.error) {
        setError('Invalid email or password');
        return;
      }
      // Redirect to home page on successful sign-in
      window.location.href = res?.url || '/';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || 'Something went wrong');
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <section className='bg-muted h-screen'>
      <div className='flex h-full items-center justify-center'>
        <div className='flex flex-col items-center gap-6 lg:justify-start'>
          <div className='min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md'>
            {heading && <h1 className='text-xl font-semibold'>{heading}</h1>}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex w-full flex-col gap-4'
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Email'
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.replace(/\s/g, ''))
                          }
                        />
                      </FormControl>
                      <FormMessage className='text-destructive' />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder='Password'
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.replace(/\s/g, ''))
                          }
                        />
                      </FormControl>
                      <FormMessage className='text-destructive' />
                    </FormItem>
                  )}
                />

                <Button type='submit' className='w-full'>
                  {buttonText}
                </Button>
                {error && (
                  <div className='flex items-center gap-2 bg-card p-2'>
                    <Info className='h-4 w-4 text-destructive' />
                    <p className='text-destructive'>{error}</p>
                  </div>
                )}
              </form>
            </Form>

            <SocialAuth />
          </div>

          <div className='text-muted-foreground flex justify-center gap-1 text-sm'>
            <p>{signupText}</p>
            <Link
              href={signupUrl}
              className='text-primary font-medium hover:underline'
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
