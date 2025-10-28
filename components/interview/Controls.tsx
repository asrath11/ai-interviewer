'use client';
import React from 'react';
import { useVoice } from '@humeai/voice-react';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  PhoneOff as PhoneOffIcon,
} from 'lucide-react';
import { VoiceVisualizer } from './VoiceVisualizer';

export function Controls({ disconnect }: { disconnect: () => void }) {
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
        <VoiceVisualizer fft={fft} />
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
