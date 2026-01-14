import { Brain } from 'lucide-react';

export function DetailedFeatures() {
  return (
    <section className='py-20 bg-primary/5'>
      <div className='px-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          <div>
            <div className='text-muted-foreground text-sm font-medium mb-4'>
              HOW IT WORKS
            </div>
            <h2 className='text-4xl font-bold text-foreground mb-6'>
              Your personal AI career coach
            </h2>
            <p className='text-lg text-muted-foreground mb-8'>
              Our platform uses advanced AI to analyze your skills, experience,
              and goals to provide personalized career guidance and interview
              preparation.
            </p>
            <div className='space-y-6'>
              {[
                'Personalized learning paths based on your career goals',
                'Real-time feedback on your interview responses',
                'Customized resume optimization for each job application',
                'Practice with industry-specific questions',
              ].map((feature, index) => (
                <div key={index} className='flex items-start gap-4'>
                  <div className='bg-primary/10 p-2 rounded-lg mt-1'>
                    <Brain className='w-5 h-5 text-primary' />
                  </div>
                  <p className='text-foreground'>{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='bg-muted rounded-2xl p-8 h-full flex items-center justify-center'>
            <div className='relative w-full aspect-video bg-background rounded-lg border border-border flex items-center justify-center'>
              <div className='text-center p-8'>
                <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse'>
                  <Brain className='w-8 h-8 text-primary' />
                </div>                <h3 className='text-xl font-semibold mb-2'>
                  AI-Powered Interview Simulation
                </h3>
                <p className='text-muted-foreground'>
                  Practice with our AI interviewer that adapts to your responses
                  and provides real-time feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
