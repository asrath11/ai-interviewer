import { ComponentProps } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSession } from 'next-auth/react';
import defaultAvatar from '../public/user-round.png';
import { Skeleton } from '@/components/ui/skeleton';

type UserAvatarProps = ComponentProps<typeof Avatar>;

export function UserAvatar(props: UserAvatarProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Skeleton className={`rounded-full h-10 w-10`} />;
  }

  const name = session?.user?.name?.trim();
  const email = session?.user?.email;

  const initials =
    (name ?? email ?? '')
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part?.[0]?.toUpperCase() ?? '')
      .join('') || 'U';

  return (
    <Avatar {...props} title={name ?? email ?? 'User'}>
      <AvatarImage
        src={session?.user?.image ?? defaultAvatar.src}
        alt={name ?? 'User'}
      />
      <AvatarFallback className='uppercase bg-muted text-muted-foreground'>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
