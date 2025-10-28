'use client';
import React from 'react';
import Logo from './Logo';
import { UserAvatar } from './UserAvatar';
export function CondensedMessages({ messages }: { messages: any[] }) {
  const filteredMessages = messages.filter(
    (msg) => msg.type === 'assistant_message' || msg.type === 'user_message'
  );
  return (
    <div className='space-y-4 flex flex-col justify-end h-screen mx-auto gap-4 w-6xl'>
      {filteredMessages.map((msg, i) => {
        const text = msg.message?.content || msg.transcript || '…';
        const audioUrl = msg.audio?.url;
        const isUser = msg.type === 'user_message';
        const isAssistant = msg.type === 'assistant_message';
        return (
          <div
            key={i}
            className={`border rounded-lg shadow-sm w-fit bg-card ${
              isUser ? 'self-end ml-18' : 'self-start mr-18'
            }`}
          >
            <div className='flex items-center justify-center gap-2 w-fit'>
              {isAssistant && (
                <span className='inline-flex size-20 items-center justify-center'>
                  <Logo className='h-full w-full' />
                </span>
              )}
              {isUser && (
                <span className='inline-flex size-20 items-center justify-center'>
                  <UserAvatar />
                </span>
              )}
              <span className='mb-2 max-w-xl p-3'>{text}</span>
            </div>
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
