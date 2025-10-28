'use client';
import React from 'react';

export function VoiceVisualizer({ fft }: { fft: number[] }) {
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
