export function Stats() {
  const stats = [
    { value: '95%', label: 'Success Rate' },
    { value: '10x', label: 'Faster Job Placement' },
    { value: '50k+', label: 'Users' },
    { value: '4.9/5', label: 'User Rating' },
  ];

  return (
    <section className='py-20 bg-primary/5'>
      <div className='px-16'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
          {stats.map((stat, index) => (
            <div key={index} className='p-6'>
              <div className='text-4xl font-bold text-foreground mb-2'>
                {stat.value}
              </div>
              <div className='text-muted-foreground'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
