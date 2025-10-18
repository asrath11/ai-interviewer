'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { VoiceProvider } from '@humeai/voice-react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableColorScheme>
          <VoiceProvider>{children}</VoiceProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
