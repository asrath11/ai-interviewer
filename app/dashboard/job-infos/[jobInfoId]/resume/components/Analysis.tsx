'use client';

import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import {
  AiAnalysisType,
  CategoryType,
  FeedbackItemType,
} from '@/types/resumeAnalysis';
import { Check, X, InfoIcon } from 'lucide-react';

interface AnalysisProps {
  obj: Partial<AiAnalysisType> | null;
  isLoading?: boolean;
}

const analysisCategories: Record<
  keyof Omit<AiAnalysisType, 'overallScore'>,
  string
> = {
  ats: 'ATS Compatibility',
  jobMatch: 'Job Match',
  writingAndFormatting: 'Writing & Formatting',
  keywordCoverage: 'Keyword Coverage',
  other: 'Additional Insights',
};

export default function Analysis({ obj, isLoading = false }: AnalysisProps) {
  if (!obj && !isLoading) return null;

  return (
    <Card className='p-8'>
      <h1 className='text-2xl mb-6'>Analysis Result</h1>
      <Accordion type='single' collapsible className='w-full'>
        {Object.entries(analysisCategories).map(([key, title]) => {
          const category: CategoryType | undefined =
            obj?.[key as keyof Omit<AiAnalysisType, 'overallScore'>];

          return (
            <AccordionItem value={key} key={key}>
              <AccordionTrigger className='text-md hover:no-underline'>
                <CategoryAccordionHeader
                  title={title}
                  score={category?.score}
                  loading={isLoading}
                />
              </AccordionTrigger>
              <AccordionContent className='flex flex-col gap-2'>
                {isLoading ? (
                  <div className='space-y-3'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                    <Skeleton className='h-4 w-1/2' />
                    <div className='space-y-2 mt-4'>
                      <Skeleton className='h-16 w-full' />
                      <Skeleton className='h-16 w-full' />
                    </div>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    <p className='text-lg text-muted-foreground'>
                      {category?.summary ?? 'No summary available.'}
                    </p>
                    <div className='flex flex-col gap-2'>
                      {(category?.feedback ?? []).length > 0 ? (
                        (category?.feedback ?? []).map((item, index) => (
                          <FeedbackItem key={index} {...item} />
                        ))
                      ) : (
                        <p className='text-sm text-muted-foreground'>
                          No feedback available.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
}

function CategoryAccordionHeader({
  title,
  score,
  loading = false,
}: {
  title: string;
  score?: number | null;
  loading?: boolean;
}) {
  let badge;
  if (loading || score == null) {
    badge = <Skeleton className='w-16 h-6' />;
  } else if (score >= 8) {
    badge = <Badge>Excellent</Badge>;
  } else if (score >= 6) {
    badge = <Badge variant='warning'>Ok</Badge>;
  } else {
    badge = <Badge variant='destructive'>Needs Work</Badge>;
  }

  return (
    <div className='flex justify-between w-full'>
      <div className='flex flex-col gap-2'>
        <span className='text-lg'>{title}</span>
        {badge}
      </div>
      {loading || score == null ? (
        <Skeleton className='w-12 h-6' />
      ) : (
        <span>{score}/10</span>
      )}
    </div>
  );
}

function FeedbackItem({ name, message, type }: FeedbackItemType) {
  const colorClass =
    {
      strength: 'border-green-400 bg-green-300/5',
      'minor-improvement': 'border-amber-500 bg-amber-300/10',
      'major-improvement': 'border-red-500 bg-red-300/10',
    }[type] || 'border-gray-300 bg-gray-100';

  const Icon =
    {
      strength: Check,
      'minor-improvement': InfoIcon,
      'major-improvement': X,
    }[type] || InfoIcon;

  return (
    <div
      className={`p-4 border ${colorClass} space-y-2.5 rounded-md flex items-start gap-2`}
    >
      {Icon && <Icon className='w-5 h-5 mt-1' />}
      <div>
        <h2 className='font-semibold text-[17px]'>{name}</h2>
        <p className='text-sm text-muted-foreground'>{message}</p>
      </div>
    </div>
  );
}
