import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function NavButton() {
    const session = useSession();
    console.log(session)

  if (session == null) {
    return <Button variant='outline'>Sign In</Button>;
  }

  return (
    <Button asChild>
      <Link href='/app'>Dashboard</Link>
    </Button>
  );
}
