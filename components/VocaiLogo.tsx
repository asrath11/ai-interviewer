import React from 'react';
import Link from 'next/link';
import Logo from '../public/logo.png';
import Image from 'next/image';
type VocaiLogoProps = {
  className?: string;
  showText?: boolean;
};

export default function VocaiLogo({
  className,
  showText = true,
}: VocaiLogoProps) {
  return (
    <Link
      href='/'
      className={`flex items-center gap-3 ${className ?? ''}`}
      aria-label='Vocai Home'
    >
      <div className='relative h-12 w-12'>
        <Image src={Logo} alt='Vocai Logo' />
      </div>
      {showText && (
        <span className='text-xl font-semibold tracking-tight text-gray-800 dark:text-white'>
          Vocai
        </span>
      )}
    </Link>
  );
}
