'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Loader2 as Loader2Icon } from 'lucide-react';
import { Messages } from '@/components/interview/Messages';

export default function InterviewPage() {
  const params = useParams();
  const { interviewId } = params as { interviewId: string };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  console.log(messages);

  useEffect(() => {
    if (!interviewId) return;
    let cancelled = false;
    (async () => {
      try {
        const { data: interview } = await axios.get(
          `/api/interviews/${interviewId}`
        );
        const chatId: string | undefined | null = interview?.humeChatId;
        if (!chatId) {
          if (!cancelled) setError('No transcript available');
          return;
        }
        const { data: events } = await axios.get(`/api/hume/messages`, {
          params: { chatId },
        });
        if (!cancelled) {
          const mapped = (events as any[])
            .filter(
              (e) => e?.type === 'AGENT_MESSAGE' || e?.type === 'USER_MESSAGE'
            )
            .map((e) => ({
              type: e.role === 'AGENT' ? 'assistant_message' : 'user_message',
              transcript: e.messageText,
              message: { content: e.messageText },
            }));
          setMessages(mapped);
        }
      } catch (e: any) {
        if (!cancelled) setError('Failed to load transcript');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [interviewId]);

  if (loading) {
    return (
      <div className='h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4'>
        <Loader2Icon className='animate-spin' size={48} />
        <div className='text-sm text-muted-foreground'>Loading transcript...</div>
      </div>
    );
  }

  return (
    <div className='h-[calc(100vh-80px)] overflow-y-auto'>
      {error && (
        <div className='p-4 text-center text-red-500 text-sm'>{error}</div>
      )}
      <div className='py-6 mx-auto flex flex-col items-center gap-4 w-full'>
        <Messages messages={messages} />
      </div>
    </div>
  );
}
