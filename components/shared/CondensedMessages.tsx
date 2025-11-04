'use client';
import React from 'react';
import Logo from './Logo';
import { UserAvatar } from './UserAvatar';

// More flexible type for API data
interface ApiMessage {
  id?: string | number;
  content: any; // Keep as any if content structure varies
  role?: string; // Make optional with fallback
  type?: string;
  [key: string]: unknown; // Allow other properties
}

export function CondensedMessages({ messages }: { messages: ApiMessage[] }) {
  const filteredMessages = messages.filter(
    (msg) => msg.type === 'assistant_message' || msg.type === 'user_message'
  );

  return (
    <div className='space-y-4 flex flex-col justify-end mx-auto gap-4 w-6xl'>
      {filteredMessages.map((msg, i) => {
        // Safe access with fallbacks
        const role = msg.role || 'assistant';
        const content =
          typeof msg.content === 'string'
            ? msg.content
            : JSON.stringify(msg.content);

        return (
          <div
            key={msg.id || i}
            className={`flex ${
              role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`flex items-start gap-3 max-w-3xl ${
                role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className='shrink-0'>
                {role === 'assistant' ? (
                  <Logo className='h-8 w-8' />
                ) : (
                  <UserAvatar />
                )}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  role === 'assistant'
                    ? 'bg-muted text-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <p className='whitespace-pre-wrap'>{content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
