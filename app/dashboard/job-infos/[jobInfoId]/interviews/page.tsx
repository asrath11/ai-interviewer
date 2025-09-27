import { Suspense } from 'react';
import InterviewContent from '@/app/dashboard/components/InterviewContent';

export default function InterviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterviewContent />
    </Suspense>
  );
}
