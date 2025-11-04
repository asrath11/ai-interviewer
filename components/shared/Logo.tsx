import React from 'react';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      fill='#FF6720'
      className={className}
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512.000000 512.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <g transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)' fill='currentColor' stroke='none'>
        <path d='M0 2560 l0 -2560 2560 0 2560 0 0 2560 0 2560 -2560 0 -2560 0 0 -2560z m5000 0 l0 -2440 -2440 0 -2440 0 0 2440 0 2440 2440 0 2440 0 0 -2440z'/>
        <path d='M1280 3840 l0 -1280 1280 0 1280 0 0 1280 0 1280 -1280 0 -1280 0 0 -1280z'/>
      </g>
    </svg>
  );
}
