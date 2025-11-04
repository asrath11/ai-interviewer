'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { getJobInfo } from '@/services/api/jobInfo';
import type { JobInfo } from '@/types/jobInfo';
import { useVoice, VoiceReadyState, ConnectOptions } from '@humeai/voice-react';
import { Loader2 as Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Messages } from '@/components/interview/Messages';
import { Controls } from '@/components/interview/Controls';
import { sampleMessages } from '@/components/interview/sampleMessages';

export default function NewInterview() {
  const params = useParams();
  const jobInfoId = (params?.jobInfoId as string) || '';
  const { data: session } = useSession();

  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [jobInfo, setJobInfo] = useState<JobInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages] = useState<any[]>([]);

  const savedChatId = useRef<string | null>(null);
  const didConnect = useRef(false);
  const didSendSettings = useRef(false);
  const didSaveFinalDuration = useRef(false);

  const {
    readyState,
    connect,
    disconnect,
    sendSessionSettings,
    messages,
    callDurationTimestamp,
  } = useVoice();

  useEffect(() => {
    if (!jobInfoId) return;
    getJobInfo(jobInfoId)
      .then(setJobInfo)
      .catch(() => setError('Failed to fetch job info'));
  }, [jobInfoId]);

  useEffect(() => {
    if (!jobInfoId) return;
    if (interviewId) return;
    (async () => {
      try {
        const res = await axios.post('/api/interviews', { jobInfoId });
        const data = res.data as { id: string };
        setInterviewId(data.id);
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 401) {
          const callback = encodeURIComponent(
            `/dashboard/job-infos/${jobInfoId}/interviews/new`
          );
          window.location.href = `/signin?callbackUrl=${callback}`;
          return;
        }
        console.error('Failed to create interview');
      }
    })();
  }, [jobInfoId, interviewId]);

  const sessionData = useMemo(() => session?.user?.name ?? 'User', [session]);
  const jobData = useMemo(
    () => ({
      title: jobInfo?.title ?? 'Not Specified',
      description: jobInfo?.description ?? '',
      experience: jobInfo?.experience ?? 'Entry',
    }),
    [jobInfo]
  );

  useEffect(() => {
    const connectNow = async () => {
      setError(null);
      try {
        const { data } = await axios.get('/api/hume/token');
        const accessToken = data?.accessToken;
        const configId = data?.configId;
        if (!accessToken) throw new Error('No access token');
        if (!configId) throw new Error('No config ID set');
        await connect({
          auth: { type: 'accessToken', value: accessToken },
          configId,
        } as ConnectOptions);
      } catch (err: any) {
        setError(err.message || 'Failed to connect');
        didConnect.current = false;
      }
    };

    if (didConnect.current) return;
    if (!interviewId) return;
    if (!jobInfo || !session) return;
    const timer = setTimeout(() => {
      didConnect.current = true;
      connectNow();
    }, 100);
    return () => clearTimeout(timer);
  }, [interviewId, jobInfo, session, connect]);

  useEffect(() => {
    if (readyState !== VoiceReadyState.OPEN) return;
    if (didSendSettings.current) return;
    if (!jobInfo || !session) return;
    const sendSettings = async () => {
      try {
        await sendSessionSettings({
          variables: {
            user_name: sessionData,
            job_title: jobData.title,
            experience_level: jobData.experience,
            job_description: jobData.description,
          },
        });
        didSendSettings.current = true;
      } catch {
        setError('Failed to send session settings');
      }
    };
    sendSettings();
  }, [readyState, jobInfo, session, sessionData, jobData, sendSessionSettings]);

  useEffect(() => {
    if (!interviewId) return;
    if (!messages?.length) return;
    if (savedChatId.current) return;
    const meta = (messages as any[]).find(
      (m: any) => m?.type === 'chat_metadata' && m?.chatId
    );
    const chatId = meta?.chatId as string | undefined;
    if (!chatId) return;
    axios
      .put(`/api/interviews/${interviewId}`, { humeChatId: chatId })
      .then(() => {
        savedChatId.current = chatId;
      })
      .catch(() => {});
  }, [messages, interviewId, callDurationTimestamp]);

  useEffect(() => {
    if (!interviewId) return;
    if (readyState !== VoiceReadyState.CLOSED) return;
    if (!savedChatId.current) return;
    if (didSaveFinalDuration.current) return;
    axios
      .put(`/api/interviews/${interviewId}`, {
        humeChatId: savedChatId.current,
        duration: callDurationTimestamp,
      })
      .then(() => {
        didSaveFinalDuration.current = true;
      })
      .catch(() => {});
  }, [readyState, interviewId, callDurationTimestamp]);

  if (!interviewId || readyState === VoiceReadyState.CONNECTING) {
    return (
      <div className='h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4'>
        <Loader2Icon className='animate-spin' size={48} />
        <div className='text-sm text-muted-foreground'>
          {interviewId ? 'Connecting to interview...' : 'Preparing interview...'}
        </div>
      </div>
    );
  }

  if (readyState === VoiceReadyState.CLOSED) {
    return (
      <>
        <div className='flex justify-between items-center p-6'>
          <div className='text-center'>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
          </div>
          <Button>Generate Feedback</Button>
        </div>
        <Messages
          messages={chatMessages.length ? chatMessages : sampleMessages}
        />
      </>
    );
  }

  return (
    <div className='overflow-y-auto h-[calc(100vh-80px)] flex flex-col-reverse'>
      <div className='py-6 mx-auto flex flex-col items-center justify-end gap-4 w-full'>
        <Messages messages={messages} />
        <Controls disconnect={disconnect} />
      </div>
    </div>
  );
}
