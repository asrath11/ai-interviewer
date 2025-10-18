'use client';
import React from 'react';

export function CondensedMessages({ messages }: { messages: any[] }) {
  return (
    <div className='space-y-4 max-w-4xl mx-auto'>
      {messages.map((msg, i) => {
        const text = msg.text || msg.transcript || '…';
        const audioUrl = msg.audio?.url;

        return (
          <div key={i} className='p-4 border rounded-lg shadow-sm'>
            <p className='mb-2'>{text}</p>
            {audioUrl && (
              <audio controls src={audioUrl} className='w-full'>
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        );
      })}
    </div>
  );
}
