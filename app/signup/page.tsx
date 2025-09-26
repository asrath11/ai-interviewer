'use client';

import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/passwordInput';
import { Button } from '@/components/ui/button';
import SocialAuth from '@/components/socialAuth';
import { Info } from 'lucide-react';

// ✅ Validation schema
const signupSchema = z
  .object({
    email: z.email('Invalid email address').nonempty('Email is required'),
    password: z
      .string()
      .nonempty('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().nonempty('Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

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
  const [error, setError] = useState('');
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    shouldFocusError: true,
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      const response = await axios.post('/api/auth/signup', values);
      console.log(response.data);
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
                        <Input type='email' placeholder='Email' {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder='Confirm Password'
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.replace(/\s/g, ''))
                          }
                        />
                      </FormControl>
                      <FormMessage />
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
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
