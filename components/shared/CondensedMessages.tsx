'use client';
import React from 'react';
import Logo from './Logo';
import { UserAvatar } from './UserAvatar';

export function CondensedMessages({ messages }: { messages: any[] }) {
  const filteredMessages = messages.filter(
    (msg) => msg.type === 'assistant_message' || msg.type === 'user_message'
  );

  return (
    <div className='space-y-4 flex flex-col justify-end mx-auto gap-4 w-6xl'>
      {filteredMessages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.role === 'assistant' ? 'justify-start' : 'justify-end'
          }`}
        >
          <div
            className={`flex items-start gap-3 max-w-3xl ${
              msg.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className='shrink-0'>
              {msg.role === 'assistant' ? (
                <Logo className='h-8 w-8' />
              ) : (
                <UserAvatar />
              )}
            </div>
            <div
              className={`px-4 py-3 rounded-2xl ${
                msg.role === 'assistant'
                  ? 'bg-muted text-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              <p className='whitespace-pre-wrap'>{msg.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
