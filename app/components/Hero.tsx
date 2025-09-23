import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className='relative overflow-hidden py-20 sm:py-32 px-16'>
      <div className='container'>
        <div className='text-center'>
          <h2 className='text-4xl sm:text-6xl font-bold text-foreground mb-6 leading-tight'>
            Land your dream job with{' '}
            <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent text-nowrap'>
              AI-powered
            </span>{' '}
            job preparation
          </h2>
          <p className='text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed'>
            Skip the guesswork and accelerate your job search. Our AI platform
            eliminates interview anxiety, optimizes your resume, and gives you the
            technical edge to land offers faster.
          </p>
          <Button size='lg' className='h-12 px-6 text-base' asChild>
            <Link href='/app'>Get Started for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
