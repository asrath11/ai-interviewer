import { Button } from '@/components/ui/button';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

export function NavButton() {
  const session = useSession();
  console.log(session);

  if (session.data?.user == null) {
    return (
      <Button variant='outline' onClick={() => signIn()}>
        Sign In
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link href='/dashboard'>Dashboard</Link>
    </Button>
  );
}
