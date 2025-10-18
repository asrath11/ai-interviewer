export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Testimonials', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
        { name: 'Cookie Policy', href: '#' },
      ],
    },
  ];

  return (
    <footer className='bg-card border-t border-border'>
      <div className='px-16 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <BrainCircuitIcon className='size-8 text-primary' />
              <h2 className='text-2xl font-bold text-foreground'>Landr</h2>
            </div>
            <p className='text-muted-foreground mb-6'>
              The AI-powered platform that helps you land your dream job faster.
            </p>
            <div className='flex space-x-4'>
              {['twitter', 'github', 'linkedin', 'facebook'].map((social) => (
                <a
                  key={social}
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                  aria-label={social}
                >
                  <span className='sr-only'>{social}</span>
                  <div className='w-8 h-8 rounded-full bg-muted flex items-center justify-center'>
                    <span className='text-sm font-medium'>
                      {social[0].toUpperCase()}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className='text-sm font-semibold text-foreground mb-4'>
                {section.title}
              </h3>
              <ul className='space-y-3'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-sm text-muted-foreground'>
            © {currentYear} Landr. All rights reserved.
          </p>
          <div className='flex space-x-6 mt-4 md:mt-0'>
            <a
              href='#'
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              Privacy Policy
            </a>
            <a
              href='#'
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              Terms of Service
            </a>
            <a
              href='#'
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Add BrainCircuitIcon component since it's used in the Footer
function BrainCircuitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4.5 4.5 0 1 0 12 18.5v-2.31a7.004 7.004 0 0 0 5.49-10.752A3 3 0 0 0 14 5z' />
      <path d='M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2' />
      <path d='M9 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2' />
      <path d='M12 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2' />
      <path d='M12 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2' />
      <path d='M15 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2' />
      <path d='M15 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2' />
    </svg>
  );
}
