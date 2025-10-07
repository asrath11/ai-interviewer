export type FeedbackItemType = {
  name: string;
  message: string;
  type: 'strength' | 'minor-improvement' | 'major-improvement';
};

export type CategoryType = {
  score: number;
  summary: string;
  feedback: FeedbackItemType[];
};

export type AiAnalysisType = {
  overallScore: number;
  ats: CategoryType;
  jobMatch: CategoryType;
  writingAndFormatting: CategoryType;
  keywordCoverage: CategoryType;
  other: CategoryType;
};
