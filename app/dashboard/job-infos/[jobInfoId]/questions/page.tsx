'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { generateQuestion } from '@/services/api/generate-question';
import { generateFeedback } from '@/services/api/generate-feedback';
import { Loader2Icon } from 'lucide-react';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';
import { ScrollArea } from '@/components/ui/scroll-area';

function QuestionSection() {
  const { jobInfoId } = useParams<{ jobInfoId: string }>();
  const [answer, setAnswer] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'medium'
  );
  const [generatedQuestion, setGeneratedQuestion] = useState(false);
  const [questionSeed, setQuestionSeed] = useState(Date.now());
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    data: questionData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['question', jobInfoId, difficulty, questionSeed],
    queryFn: () => generateQuestion(jobInfoId, difficulty),
    enabled: false,
  });

  // Feedback Query
  const {
    data: feedback,
    isFetching: feedbackLoading,
    error: feedbackError,
    refetch: getFeedback,
  } = useQuery({
    queryKey: ['feedback', jobInfoId, questionData, answer],
    queryFn: () => generateFeedback(jobInfoId, questionData!, answer),
    enabled: false,
  });

  const onGenerateClick = (difficulty: string) => {
    setGeneratedQuestion(true);
    setDifficulty(difficulty as 'easy' | 'medium' | 'hard');
    setQuestionSeed(Date.now()); // refresh seed for new fetch
  };

  useEffect(() => {
    if (generatedQuestion) refetch();
  }, [difficulty, questionSeed, generatedQuestion, refetch]);

  const handleGetFeedback = () => {
    if (!answer || !questionData) return;
    getFeedback();
  };

  return (
    <>
      {/* Top bar */}
      <div className='flex justify-between items-center p-4 border-b bg-muted/20'>
        <Button
          variant='ghost'
          onClick={() => router.push(`/dashboard/job-infos/${jobInfoId}`)}
        >
          Back
        </Button>
        <div className='flex gap-2'>
          {isFetching ? (
            <Button disabled>
              <Loader2Icon className='animate-spin mr-2 h-4 w-4' />
              Generating...
            </Button>
          ) : generatedQuestion ? (
            <>
              <Button
                onClick={() => {
                  setGeneratedQuestion(false);
                  setAnswer('');
                }}
                variant='ghost'
              >
                Skip
              </Button>
              <Button
                disabled={!answer || feedbackLoading}
                onClick={handleGetFeedback}
              >
                {feedbackLoading ? (
                  <>
                    <Loader2Icon className='animate-spin mr-2 h-4 w-4' />
                    Evaluating...
                  </>
                ) : (
                  'Answer'
                )}
              </Button>
            </>
          ) : (
            ['easy', 'medium', 'hard'].map((level) => (
              <Button
                key={level}
                onClick={() =>
                  onGenerateClick(level as 'easy' | 'medium' | 'hard')
                }
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))
          )}
        </div>
        {/* Placeholder for spacing */}
        <div></div>
      </div>

      {/* Main resizable layout */}
      <ResizablePanelGroup
        direction='horizontal'
        className='h-[calc(100vh-64px)]'
      >
        {/* LEFT SIDE */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction='vertical'>
            {/* Question Panel */}
            <ResizablePanel defaultSize={60} minSize={20}>
              <div className='h-full p-4'>
                {isFetching ? (
                  <p>Loading question...</p>
                ) : (
                  <ScrollArea className='h-full'>
                    <MarkdownRenderer>
                      {generatedQuestion
                        ? questionData || 'No question generated.'
                        : 'Click a difficulty to generate a question.'}
                    </MarkdownRenderer>
                  </ScrollArea>
                )}
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Feedback Panel */}
            {(feedbackLoading || feedback || feedbackError) && (
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className='h-full p-4'>
                  <h3 className='font-semibold mb-2'>AI Feedback</h3>
                  <ScrollArea className='h-full w-full rounded-md border p-4 bg-muted/30'>
                    {feedbackLoading ? (
                      <div className='flex flex-col items-center justify-center h-40 text-muted-foreground'>
                        <Loader2Icon className='animate-spin h-8 w-8 mb-2' />
                        <p>Analyzing your answer...</p>
                      </div>
                    ) : feedbackError ? (
                      <div className='flex items-center justify-center h-40 text-destructive'>
                        <p>❌ Error generating feedback. Please try again.</p>
                      </div>
                    ) : (
                      <div className='prose dark:prose-invert max-w-none text-sm'>
                        <MarkdownRenderer>{feedback}</MarkdownRenderer>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* RIGHT SIDE — Answer input */}
        <ResizablePanel
          defaultSize={50}
          minSize={30}
          className='bg-muted/30 h-screen'
        >
          <div className='h-screen p-4 flex flex-col'>
            <textarea
              ref={textareaRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className='w-full h-full resize-none bg-transparent text-xl leading-relaxed placeholder:text-xl focus:outline-none'
              placeholder='Type your answer here...'
              disabled={feedbackLoading}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default QuestionSection;
