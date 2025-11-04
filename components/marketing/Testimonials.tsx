// Moved from app/components/Testimonials.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'TechCorp',
    image: 'https://i.pravatar.cc/150?img=1',
    content:
      'This platform completely transformed my interview preparation. The AI feedback was spot on and helped me land my dream job at a FAANG company!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateX',
    image: 'https://i.pravatar.cc/150?img=2',
    content:
      'As someone who used to get nervous during interviews, the practice sessions were a game-changer. I felt so much more confident in my actual interviews.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    company: 'DesignHub',
    image: 'https://i.pravatar.cc/150?img=3',
    content:
      'The detailed feedback on my answers helped me understand exactly where I needed to improve. I went from multiple rejections to multiple offers!',
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className='py-24 sm:py-32 bg-muted/20'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            What our users say
          </h2>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Don&apos;t just take our word for it. Here&apos;s what our users have
            to say about their experience.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className='h-full'>
              <CardContent className='p-8'>
                <div className='flex items-center gap-x-4'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='text-left'>
                    <div className='font-medium text-foreground'>
                      {testimonial.name}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className='mt-6 text-muted-foreground'>
                  {testimonial.content}
                </p>
                <div className='mt-4 flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      )}
                      aria-hidden='true'
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
