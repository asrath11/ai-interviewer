import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
type VocaiLogoProps = {
  className?: string;
  showText?: boolean;
};

export default function VocaiLogo({
  className,
  showText = true,
}: VocaiLogoProps) {
  return (
    <Link href='/' className={`flex items-center gap-2 ${className ?? ''}`}>
      <span className='inline-flex h-24 w-24 items-center justify-center rounded-md shadow-sm'>
        <Logo />
      </span>
      {showText && (
        <span className='text-lg font-semibold tracking-tight'>Vocai</span>
      )}
    </Link>
  );
}
