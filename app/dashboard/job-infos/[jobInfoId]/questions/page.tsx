'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { generateQuestion } from '@/services/api/generate-question';
import { Loader2Icon } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { ScrollArea } from '@/components/ui/scroll-area';

function QuestionSection() {
  const { jobInfoId } = useParams<{ jobInfoId: string }>();
  const [answer, setAnswer] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'medium'
  );
  const [generatedQuestion, setGeneratedQuestion] = useState(false);
  const [questionSeed, setQuestionSeed] = useState(Date.now());
  const [feedback, setFeedback] = useState('');
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onGenerateClick = (difficulty: string) => {
    setGeneratedQuestion(true);
    setDifficulty(difficulty as 'easy' | 'medium' | 'hard');
    setQuestionSeed(Date.now()); // refresh seed for new fetch
  };

  const {
    data: questionData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['question', jobInfoId, difficulty, questionSeed],
    queryFn: () => generateQuestion(jobInfoId, difficulty),
    enabled: false,
  });

  useEffect(() => {
    if (generatedQuestion) refetch();
  }, [difficulty, questionSeed, generatedQuestion, refetch]);

  // Streaming feedback handler
  const handleGetFeedback = async () => {
    if (!answer || !questionData) return;
    setFeedbackLoading(true);
    setFeedback('');
    try {
      const res = await fetch(`/api/job-info/questions/generate-feeback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobInfoId,
          questionText: questionData, // questionData is the question text
          answer,
        }),
      });
      if (!res.body) throw new Error('No response body');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let streamed = '';
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          streamed += decoder.decode(value, { stream: !done });
          setFeedback(streamed);
        }
      }
    } catch {
      setFeedback('Error generating feedback.');
    } finally {
      setFeedbackLoading(false);
    }
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
                  setFeedback('');
                  setAnswer('');
                  setFeedbackLoading(false);
                }}
                variant='ghost'
              >
                Skip
              </Button>
              <Button disabled={!answer} onClick={handleGetFeedback}>
                Answer
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

            {/* Feedback Panel - only show if feedback is loading or available */}
            {(feedbackLoading || feedback) && (
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className='h-full p-4'>
                  <ScrollArea className='h-full'>
                    <MarkdownRenderer>
                      {feedbackLoading ? 'Getting feedback...' : feedback}
                    </MarkdownRenderer>
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
