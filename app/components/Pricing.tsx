import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for trying out our platform',
      features: [
        '5 AI interview practice sessions/month',
        'Basic resume analysis',
        '50 technical questions',
        'Email support',
      ],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29',
      description: 'For serious job seekers',
      features: [
        'Unlimited AI interview practice',
        'Advanced resume optimization',
        '500+ technical questions',
        'Priority support',
        'Interview analytics',
      ],
      buttonText: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Team',
      price: 'Custom',
      description: 'For teams and organizations',
      features: [
        'All Professional features',
        'Team dashboard',
        'Dedicated account manager',
        'Custom training modules',
        'SLA & priority support',
      ],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section className='py-20 bg-muted/20'>
      <div className='px-16'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-foreground mb-4'>
            Simple, transparent pricing
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border ${
                plan.popular ? 'border-primary' : 'border-border'
              } bg-card overflow-hidden`}
            >
              {plan.popular && (
                <div className='absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-4 py-1 rounded-bl-lg'>
                  Most Popular
                </div>
              )}
              <div className='p-8'>
                <h3 className='text-2xl font-bold text-foreground mb-2'>
                  {plan.name}
                </h3>
                <div className='flex items-baseline mb-4'>
                  <span className='text-4xl font-bold text-foreground'>
                    {plan.price}
                  </span>
                  {plan.price !== 'Free' && (
                    <span className='text-muted-foreground'>/month</span>
                  )}
                </div>
                <p className='text-muted-foreground mb-6'>{plan.description}</p>
                <ul className='space-y-3 mb-8'>
                  {plan.features.map((feature, i) => (
                    <li key={i} className='flex items-center'>
                      <Check className='w-5 h-5 text-primary mr-2' />
                      <span className='text-foreground'>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'default' : 'outline'}
                  className='w-full h-12 text-base'
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
