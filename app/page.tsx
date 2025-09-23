import { ThemeToggle } from '@/components/themeToggle';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
export default async function Home() {
  const session = await getServerSession();
  return (
    <div className='flex justify-end'>
      <ThemeToggle />
    </div>
  );
}
