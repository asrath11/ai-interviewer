import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FileSlidersIcon, BookOpenCheckIcon, SpeechIcon } from 'lucide-react';

export function Features() {
  const features = [
    {
      title: 'AI Interview Practice',
      Icon: SpeechIcon,
      description:
        'Simulate real interviews with AI that adapts to your responses. Build confidence and eliminate nervousness before the big day.',
    },
    {
      title: 'Tailored Resume Suggestions',
      Icon: FileSlidersIcon,
      description:
        'Transform your resume into an ATS-friendly, recruiter-approved document that gets you more callbacks.',
    },
    {
      title: 'Technical Question Practice',
      Icon: BookOpenCheckIcon,
      description:
        'Solve coding problems with guided hints and explanations. Perfect your approach to technical interviews.',
    },
  ];

  return (
    <section className='py-8 px-16'>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {features.map((feature) => (
            <Card
              key={feature.title}
              className='group transition-all duration-300 transform hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary'
            >              <CardHeader className='pb-4'>
                <div className='w-16 h-16 mb-4 bg-primary/10 flex items-center justify-center rounded-lg'>
                  <feature.Icon className='w-8 h-8 text-primary' />
                </div>
                <CardTitle className='text-2xl font-bold text-card-foreground'>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <p className='px-6 pb-6 text-muted-foreground'>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
