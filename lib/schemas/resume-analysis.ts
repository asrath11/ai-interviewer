import { z } from 'zod';

export const FeedbackItemSchema = z.object({
  name: z.string(),
  message: z.string(),
  type: z.enum(['strength', 'minor-improvement', 'major-improvement']),
});

export const CategorySchema = z.object({
  score: z.number(),
  summary: z.string(),
  feedback: z.array(FeedbackItemSchema),
});

export const ResumeAnalysisSchema = z.object({
  overallScore: z.number(),
  ats: CategorySchema,
  jobMatch: CategorySchema,
  writingAndFormatting: CategorySchema,
  keywordCoverage: CategorySchema,
  other: CategorySchema,
});
