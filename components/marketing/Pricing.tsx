// Moved from app/components/Pricing.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    price: 0,
    description: 'Perfect for trying out our platform',
    features: [
      '5 interview sessions per month',
      'Basic feedback',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: 29,
    description: 'For serious job seekers',
    features: [
      'Unlimited interview sessions',
      'Advanced feedback & analytics',
      'Priority support',
      'Custom interview questions',
      'Resume review',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and organizations',
    features: [
      'Everything in Professional',
      'Team management',
      'Dedicated account manager',
      'Custom integrations',
      'SLA & security review',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id='pricing' className='py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Simple, transparent pricing
          </h2>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Start with our free plan and upgrade when you're ready. No hidden
            fees.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'flex flex-col justify-between rounded-3xl p-8 ring-1 ring-gray-200 dark:ring-gray-800',
                plan.popular
                  ? 'bg-primary/5 ring-2 ring-primary'
                  : 'bg-background'
              )}
            >
              <div>
                <div className='flex items-center justify-between gap-x-4'>
                  <h3
                    id={plan.name}
                    className={cn(
                      'text-lg font-semibold leading-8',
                      plan.popular ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <span className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary'>
                      Most popular
                    </span>
                  )}
                </div>
                <p className='mt-4 text-sm leading-6 text-muted-foreground'>
                  {plan.description}
                </p>
                <p className='mt-6 flex items-baseline gap-x-1'>
                  <span className='text-4xl font-bold tracking-tight text-foreground'>
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </span>
                  {typeof plan.price === 'number' && (
                    <span className='text-sm font-semibold leading-6 text-muted-foreground'>
                      /month
                    </span>
                  )}
                </p>
                <ul className='mt-8 space-y-3 text-sm leading-6 text-muted-foreground'>
                  {plan.features.map((feature) => (
                    <li key={feature} className='flex gap-x-3'>
                      <Check
                        className='h-6 w-5 flex-none text-primary'
                        aria-hidden='true'
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className={cn(
                  'mt-8',
                  plan.popular
                    ? 'bg-primary hover:bg-primary/90'
                    : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200'
                )}
                size='lg'
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
