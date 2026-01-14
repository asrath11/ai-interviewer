export function HowItWorks() {
  const steps = [
    {
      title: 'Sign Up & Create Profile',
      description:
        'Provide a job description so our AI can tailor interview questions to your needs.',
    },
    {
      title: 'Start Your AI Interview',
      description:
        'Engage in a realistic mock interview with our AI, analyzing your responses in real-time.',
    },
    {
      title: 'Receive Instant Feedback',
      description:
        'Get detailed feedback on your answers, communication, and body language.',
    },
    {
      title: 'Practice and Improve',
      description:
        'Use the feedback to improve and practice until you feel confident for your real interviews.',
    },
  ];

  return (
    <section className='py-20 md:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            How It Works
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Our platform is designed to be simple and intuitive. Here&apos;s how
            you can get started in just a few easy steps.
          </p>
        </div>
        <div className='mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {steps.map((step, index) => (
            <div key={index} className='group text-center transition-all duration-300 transform hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary'>
              <div className='mb-4 flex justify-center'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground'>
                  {index + 1}
                </div>
              </div>
              <h3 className='text-lg font-semibold text-foreground'>
                {step.title}
              </h3>
              <p className='mt-2 text-muted-foreground'>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
