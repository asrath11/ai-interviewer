'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useVoice, VoiceReadyState, ConnectOptions } from '@humeai/voice-react';
import { CondensedMessages } from '@/components/CondensedMessages';
import { Button } from '@/components/ui/button';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  PhoneOff as PhoneOffIcon,
  Loader2 as Loader2Icon,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getJobInfo } from '@/services/api/jobInfo';
import type { JobInfo } from '@/types/jobInfo';
import axios from 'axios';

const sampleMessages = [
  {
    type: 'socket_connected',
    receivedAt: '2025-10-27T16:30:26.221Z',
  },
  {
    type: 'chat_metadata',
    chatGroupId: '6a910f24-bedd-4525-a69a-9087a29da3ff',
    chatId: '28c46add-2ca5-487e-9908-aabd99f44cbb',
    requestId: '97e3c2eb-5558-4cbf-85e6-529bb50b08544659391',
    receivedAt: '2025-10-27T16:30:26.218Z',
  },
  {
    type: 'assistant_message',
    id: '8914f72f-45b6-4a26-99ad-17bd2c7aaeb9',
    message: {
      role: 'assistant',
      content: "Hi pothuganti asrath! I'm Alex, your interviewer for today.",
    },
    models: {},
    fromText: false,
    receivedAt: '2025-10-27T16:30:26.991Z',
  },
  {
    type: 'assistant_prosody',
    models: {
      prosody: {
        scores: {
          admiration: 0.0620269775390625,
          adoration: 0.023670196533203125,
          aestheticAppreciation: 0.030002593994140625,
          amusement: 0.08770751953125,
          anger: 0.02256011962890625,
          anxiety: 0.007756710052490234,
          awe: 0.00527539849281311,
          awkwardness: 0.0605316162109375,
          boredom: 0.044345855712890625,
          calmness: 0.13134765625,
          concentration: 0.140869140625,
          confusion: 0.03262901306152344,
          contemplation: 0.0588226318359375,
          contentment: 0.0740509033203125,
          determination: 0.131011962890625,
          excitement: 0.1412353515625,
          interest: 0.15542984008789062,
          joy: 0.0912322998046875,
          pride: 0.13650846481323242,
          satisfaction: 0.1275177001953125,
        },
      },
    },
    id: '8914f72f-45b6-4a26-99ad-17bd2c7aaeb9',
    receivedAt: '2025-10-27T16:30:29.991Z',
  },
  {
    type: 'assistant_message',
    id: 'feca6651-1f40-46f8-982f-88e5f5d78417',
    message: {
      role: 'assistant',
      content:
        'It’s great to meet you. I’m really looking forward to our chat about the senior web developer role.',
    },
    models: {},
    fromText: false,
    receivedAt: '2025-10-27T16:30:30.822Z',
  },
  {
    type: 'assistant_message',
    id: '7897956b-4184-4b95-ac62-8790c75afcca',
    message: {
      role: 'assistant',
      content:
        'Could you start by telling me a little about yourself and what inspired you to apply?',
    },
    models: {},
    fromText: false,
    receivedAt: '2025-10-27T16:30:36.310Z',
  },
  {
    type: 'user_message',
    message: {
      role: 'user',
      content: 'Ya sure.',
    },
    models: {},
    time: {
      begin: 16084,
      end: 17580,
    },
    fromText: false,
    interim: false,
    receivedAt: '2025-10-27T16:30:44.738Z',
  },
  {
    type: 'assistant_message',
    id: 'e987a859-7e16-4435-99b3-5cb1bc45e1d8',
    message: {
      role: 'assistant',
      content:
        'Okay, great. So, maybe you could start by telling me a bit about your background and what sparked your interest in this senior web developer position?',
    },
    models: {},
    fromText: false,
    receivedAt: '2025-10-27T16:30:44.740Z',
  },
  {
    type: 'user_message',
    message: {
      role: 'user',
      content: 'I first ordered my mca from lpo university from india.',
    },
    models: {},
    time: {
      begin: 18100,
      end: 24268,
    },
    fromText: false,
    interim: false,
    receivedAt: '2025-10-27T16:30:51.438Z',
  },
  {
    type: 'assistant_message',
    id: '7f3a2310-0daf-4ad2-aad9-4d5562647da7',
    message: {
      role: 'assistant',
      content: "Okay, LPO University in India. That's interesting.",
    },
    models: {},
    fromText: false,
    receivedAt: '2025-10-27T16:30:51.438Z',
  },
  {
    type: 'assistant_message',
    id: 'c6fd72bd-1c32-4887-b1b1-e7ed4b9fca32',
    message: {
      role: 'assistant',
      content:
        'And what was it about your studies there, or perhaps after graduation, that led you to apply for this senior web developer role with us?',
    },
    models: {},
    fromText: false,
    receivedAt: '2025-10-27T16:30:55.391Z',
  },
];

export default function InterviewPage() {
  const { readyState, connect, disconnect, sendSessionSettings } = useVoice();
  const params = useParams();
  const { data: session } = useSession();
  const jobInfoId = (params?.jobInfoId as string) || '';
  const [jobInfo, setJobInfo] = useState<JobInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const didConnect = useRef(false);
  const didSendSettings = useRef(false);

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
    if (!jobInfoId) return;
    getJobInfo(jobInfoId)
      .then(setJobInfo)
      .catch(() => setError('Failed to fetch job info'));
  }, [jobInfoId]);

  const connectNow = async () => {
    setError(null);

    try {
      const { data } = await axios.get('/api/hume/token');
      const accessToken = data?.accessToken;
      const configId = data?.configId;

      if (!accessToken) throw new Error('No access token');
      if (!configId) throw new Error('No config ID set');

      // await connect({
      //   auth: {
      //     type: 'accessToken',
      //     value: accessToken,
      //   },
      //   configId,
      // } as ConnectOptions);
    } catch (err: any) {
      setError(err.message || 'Failed to connect');
      didConnect.current = false;
    }
  };

  useEffect(() => {
    if (didConnect.current) return;
    if (!jobInfo || !session) return;

    // const timer = setTimeout(() => {
    //   didConnect.current = true;
    //   connectNow();
    // }, 100);

    // return () => clearTimeout(timer);
  }, [jobInfo, session]);

  useEffect(() => {
    if (readyState !== VoiceReadyState.OPEN) return;
    if (didSendSettings.current) return;
    if (!jobInfo || !session) return;

    // const sendSettings = async () => {
    //   try {
    //     await sendSessionSettings({
    //       variables: {
    //         user_name: sessionData,
    //         job_title: jobData.title,
    //         experience_level: jobData.experience,
    //         job_description: jobData.description,
    //       },
    //     });
    //     didSendSettings.current = true;
    //   } catch (err: any) {
    //     setError('Failed to send session settings');
    //   }
    // };

    // sendSettings();
  }, [readyState, jobInfo, session, sessionData, jobData, sendSessionSettings]);

  // if (readyState === VoiceReadyState.CONNECTING) {
  //   return (
  //     <div className='h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4'>
  //       <Loader2Icon className='animate-spin' size={48} />
  //       <div className='text-sm text-muted-foreground'>
  //         Connecting to interview...
  //       </div>
  //     </div>
  //   );
  // }

  // if (readyState === VoiceReadyState.CLOSED) {
  //   return (
  //     <div className='h-[calc(100vh-80px)] flex flex-col gap-4 items-center justify-center'>
  //       <div className='text-sm text-muted-foreground'>
  //         Not connected to Hume Voice.
  //       </div>
  //       {error && (
  //         <div className='text-red-500 text-sm max-w-md text-center'>{error}</div>
  //       )}
  //       <Button
  //         onClick={() => {
  //           didConnect.current = false;
  //           didSendSettings.current = false;
  //           connectNow();
  //         }}
  //       >
  //         Connect to Interview
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div className='overflow-y-auto h-[calc(100vh-80px)] flex flex-col-reverse'>
      <div className='py-6 mx-auto flex flex-col items-center justify-end gap-4 w-full'>
        <Messages />
        <Controls disconnect={disconnect} />
      </div>
    </div>
  );
}

function Messages() {
  // const { messages } = useVoice();
  const messages = sampleMessages;
  return <CondensedMessages messages={messages} />;
}

function Controls({ disconnect }: { disconnect: () => void }) {
  const { isMuted, mute, unmute, fft } = useVoice();

  return (
    <div className='flex items-center justify-center gap-10 rounded-3xl border border-border/50 bg-background/95 backdrop-blur-2xl px-6 py-4 shadow-2xl ring-1 ring-white/10'>
      {/* Mute Control */}
      <div className='flex flex-col items-center gap-2'>
        <button
          onClick={() => (isMuted ? unmute() : mute())}
          className={`relative flex cursor-pointer items-center justify-center rounded-2xl p-3 transition-all duration-300 hover:scale-105 active:scale-95 ${
            isMuted
              ? 'bg-destructive/20 hover:bg-destructive/30 ring-2 ring-destructive/30'
              : 'bg-primary/15 hover:bg-primary/25 ring-2 ring-primary/20'
          }`}
        >
          {isMuted ? (
            <MicOffIcon size={32} className='text-destructive' />
          ) : (
            <MicIcon size={32} className='text-primary' />
          )}
        </button>
        <span className='text-xs font-medium text-muted-foreground'>
          {isMuted ? 'Muted' : 'Mute'}
        </span>
      </div>

      {/* Visualizer */}
      <div className='flex flex-col items-center justify-center gap-2'>
        <FftVisualizer fft={fft} />
        <span className='text-[11px] text-muted-foreground'>Listening...</span>
      </div>

      {/* End Call */}
      <div className='flex flex-col items-center gap-2'>
        <button
          onClick={disconnect}
          className='flex items-center justify-center rounded-2xl bg-destructive p-3 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-destructive/90 shadow-lg ring-2 ring-destructive/30 group'
        >
          <PhoneOffIcon size={32} className='text-white' />
        </button>
        <span className='text-xs font-medium text-muted-foreground'>
          End Call
        </span>
      </div>
    </div>
  );
}

function FftVisualizer({ fft }: { fft: number[] }) {
  return (
    <div className='flex gap-1.5 items-end h-10 w-56'>
      {fft.map((value, index) => {
        const percent = Math.min((value / 4) * 100, 100);
        return (
          <div
            key={index}
            className='bg-primary/75 w-1 rounded transition-all duration-100'
            style={{ height: percent < 5 ? 3 : percent + '%' }}
          />
        );
      })}
    </div>
  );
}
