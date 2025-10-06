'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const jobFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  title: z.string().min(2).optional(),
  experience: z.enum(['Entry', 'Mid', 'Senior']),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

// Default values
const defaultValues: Partial<JobFormValues> = {
  name: '',
  title: '',
  experience: 'Entry',
  description: '',
};

export function JobInfoForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });

  async function onSubmit(data: JobFormValues) {
    try {
      setIsSubmitting(true);
      console.log(data);
      const response = await fetch('/api/job-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      // Redirect to dashboard after successful creation
      router.push('/dashboard');
      router.refresh(); // Refresh the dashboard to show the new job
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Job Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Job Name' {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this job opportunity.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title(Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder='Job Title' {...field} />
                    </FormControl>
                    <FormDescription>
                      The title of the job opportunity.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='experience'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select experience level' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Entry'>Entry Level</SelectItem>
                        <SelectItem value='Mid'>Mid Level</SelectItem>
                        <SelectItem value='Senior'>Senior Level</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The experience level required for this job opportunity.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='md:col-span-2'>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Enter job description here...'
                          className='min-h-[120px]'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A description of the job opportunity and requirements.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type='submit'
              className='w-full font-bold text-md'
              size='lg'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Job Info'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
