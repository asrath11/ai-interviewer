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
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

const jobFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters if provided.',
  }).optional().or(z.literal('')),
  experience: z.enum(['Entry', 'Mid', 'Senior']),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

const defaultValues: JobFormValues = {
  name: '',
  title: '',
  experience: 'Entry',
  description: '',
};

type JobInfoFormProps = {
  initialValues?: Partial<JobFormValues>;
  onSubmit?: (data: JobFormValues & { userId: string }) => Promise<void> | void;
  submitLabel?: string;
};

export function JobInfoForm({
  initialValues,
  onSubmit,
  submitLabel,
}: JobInfoFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  async function handleCreate(data: JobFormValues) {
    try {
      setIsSubmitting(true);

      // ✅ Include userId from session
      const payload = {
        ...data,
        userId: session?.user?.id, // 👈 attach userId automatically
      };

      const response = await fetch('/api/job-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create job');

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Error creating job:', error);
      throw error; // Re-throw to allow the form to handle the error
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFormSubmit = async (formData: JobFormValues) => {
    if (!session?.user?.id) {
      console.error('User not authenticated');
      return;
    }

    // Clean up the data by removing empty strings for optional fields
    const cleanedData = {
      ...formData,
      title: formData.title?.trim() || undefined, // Convert empty string to undefined
    };

    if (onSubmit) {
      await onSubmit({ ...cleanedData, userId: session.user.id });
    } else {
      await handleCreate(cleanedData);
    }
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Job Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='space-y-6'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter job name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g. Software Engineer' {...field} />
                    </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Paste the job description here...'
                      className='min-h-[200px]'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can paste the entire job posting here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end'>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : submitLabel || 'Save Job'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
