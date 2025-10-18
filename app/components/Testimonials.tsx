import { Card, CardContent } from '@/components/ui/card';

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'The AI interview practice was a game-changer for me. I landed my dream job at Google after just 2 weeks of practice!',
      author: 'Sarah K.',
      role: 'Software Engineer at Google',
    },
    {
      quote:
        'The resume optimization tool helped me get 3x more callbacks. Highly recommended for anyone in the job market!',
      author: 'Michael T.',
      role: 'Product Manager',
    },
    {
      quote:
        'The technical question bank and explanations are top-notch. I aced my coding interviews thanks to this platform.',
      author: 'David L.',
      role: 'Full Stack Developer',
    },
  ];

  return (
    <section className='py-20 px-16'>
      <div>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-foreground mb-4'>
            Trusted by job seekers worldwide
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Join thousands of professionals who have accelerated their job search
            with our platform.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='h-full'>
              <CardContent className='p-8 h-full flex flex-col'>
                <div className='text-5xl leading-none mb-6 text-muted-foreground/20'>
                  &quot;
                </div>
                <p className='text-lg text-foreground mb-6 flex-grow'>
                  {testimonial.quote}
                </p>
                <div>
                  <div className='font-semibold text-foreground'>
                    {testimonial.author}
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {testimonial.role}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
