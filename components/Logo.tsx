import React from 'react';

type LogoProps = {
  className?: string;
};

function Logo({ className }: LogoProps) {
  return (
    <svg
      className={className}
      width='100%'
      height='100%'
      viewBox='0 0 200 200'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        {/* Main glowing gradient */}
        <linearGradient id='mainGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#6a11cb' />
          <stop offset='100%' stopColor='#2575fc' />
        </linearGradient>

        {/* Reverse gradient for inner elements */}
        <linearGradient id='innerGradient' x1='100%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' stopColor='#2575fc' />
          <stop offset='100%' stopColor='#6a11cb' />
        </linearGradient>

        {/* Glow effect */}
        <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
          <feGaussianBlur in='SourceGraphic' stdDeviation='5' result='blur' />
          <feMerge>
            <feMergeNode in='blur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>

        {/* Animation for shimmer */}
        <linearGradient id='shimmer' x1='0%' y1='0%' x2='200%' y2='0%'>
          <stop offset='0%' stopColor='#ffffff00' />
          <stop offset='50%' stopColor='#ffffff55' />
          <stop offset='100%' stopColor='#ffffff00' />
          <animate
            attributeName='x1'
            values='0%;200%'
            dur='3s'
            repeatCount='indefinite'
          />
          <animate
            attributeName='x2'
            values='100%;300%'
            dur='3s'
            repeatCount='indefinite'
          />
        </linearGradient>

        <style>
          {`
        .pulse {
          transform-origin: center;
          animation: pulse 2.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
      `}
        </style>
      </defs>

      {/* Outer flow curve */}
      <path
        d='M40 100 C60 50, 80 150, 100 100 C120 50, 140 150, 160 100'
        stroke='url(#mainGradient)'
        strokeWidth='8'
        fill='none'
        strokeLinecap='round'
        filter='url(#glow)'
      />

      {/* Inner neural web */}
      <g stroke='url(#innerGradient)' strokeWidth='3' fill='none'>
        {/* Core circle */}
        <circle
          cx='100'
          cy='100'
          r='18'
          fill='url(#innerGradient)'
          className='pulse'
        />

        {/* Corner nodes */}
        <circle cx='70' cy='80' r='8' fill='url(#innerGradient)' />
        <circle cx='130' cy='80' r='8' fill='url(#innerGradient)' />
        <circle cx='70' cy='120' r='8' fill='url(#innerGradient)' />
        <circle cx='130' cy='120' r='8' fill='url(#innerGradient)' />

        {/* Connections */}
        <line x1='100' y1='100' x2='70' y2='80' />
        <line x1='100' y1='100' x2='130' y2='80' />
        <line x1='100' y1='100' x2='70' y2='120' />
        <line x1='100' y1='100' x2='130' y2='120' />
        <line x1='70' y1='80' x2='130' y2='80' />
        <line x1='70' y1='120' x2='130' y2='120' />
        <line x1='70' y1='80' x2='70' y2='120' />
        <line x1='130' y1='80' x2='130' y2='120' />
      </g>

      {/* Accent spark dots */}
      <g fill='url(#shimmer)' filter='url(#glow)'>
        <circle cx='60' cy='84' r='3' />
        <circle cx='80' cy='116' r='3' />
        <circle cx='120' cy='84' r='3' />
        <circle cx='140' cy='116' r='3' />
      </g>
    </svg>
  );
}

export default Logo;
