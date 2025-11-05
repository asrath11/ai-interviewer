'use client';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UploadCloud } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Analysis from './components/Analysis';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { z } from 'zod';

const FeedbackItemSchema = z.object({
  name: z.string(),
  message: z.string(),
  type: z.enum(['strength', 'minor-improvement', 'major-improvement']),
});

const CategorySchema = z.object({
  score: z.number(),
  summary: z.string(),
  feedback: z.array(FeedbackItemSchema),
});

const ResumeAnalysisSchema = z.object({
  overallScore: z.number(),
  ats: CategorySchema,
  jobMatch: CategorySchema,
  writingAndFormatting: CategorySchema,
  keywordCoverage: CategorySchema,
  other: CategorySchema,
});

export default function ResumeUpload() {
  const { jobInfoId } = useParams<{ jobInfoId: string }>();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const MAX_SIZE_MB = 5;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const {
    object: aiAnalysis,
    isLoading,
    submit: generateAnalysis,
  } = useObject({
    api: '/api/job-info/resume',
    schema: ResumeAnalysisSchema,
    fetch: (url, options) => {
      const headers = new Headers(options?.headers);
      headers.delete('Content-Type');
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('jobInfoId', jobInfoId);
      return fetch(url, { ...options, headers, body: formData });
    },
  });
  const validateFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document.');
      return false;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError(`File size must be less than ${MAX_SIZE_MB}MB.`);
      return false;
    }
    return true;
  };

  // Handle drag & drop upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError('');
    const dropped = e.dataTransfer.files[0];
    if (dropped && validateFile(dropped)) {
      setFile(dropped);
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const selected = e.target.files?.[0];
    if (selected && validateFile(selected)) {
      setFile(selected);
    }
  };

  React.useEffect(() => {
    if (file) {
      generateAnalysis(null);
    }
  }, [file]);

  return (
    <div>
      <Button
        className='mt-4 mx-4'
        variant='ghost'
        onClick={() => router.push(`/dashboard/job-infos/${jobInfoId}`)}
      >
        Back
      </Button>
      <div className='flex flex-col min-h-[60vh] p-4 gap-4'>
        <Card className='w-full p-8 flex flex-col gap-4 shadow-lg transition-all duration-200'>
          <h2 className='text-2xl font-bold'>Upload Your Resume</h2>
          <p className='text-muted-foreground mb-4'>
            Get personalized feedback and improvement suggestions.
          </p>
          <div
            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 cursor-pointer transition-colors ${
              error ? 'border-red-500' : 'border-muted hover:border-primary'
            }`}
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <UploadCloud className='w-10 h-10 text-muted-foreground mb-2' />
            <h2 className='text-lg font-semibold'>
              Drop your resume here or click to browse
            </h2>
            <span className='text-sm text-muted-foreground'>
              Supports PDF or Word documents (Max {MAX_SIZE_MB}MB)
            </span>
            <input
              ref={inputRef}
              type='file'
              accept='.pdf,.doc,.docx'
              className='hidden'
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </div>
          {error && (
            <div className='text-red-500 text-sm mt-2 font-medium'>{error}</div>
          )}
          {file && isLoading && (
            <div className='text-sm text-muted-foreground mt-3 animate-pulse'>
              Analyzing your resume...
            </div>
          )}
        </Card>
        {aiAnalysis && <Analysis obj={aiAnalysis as any} />}
      </div>
    </div>
  );
}
