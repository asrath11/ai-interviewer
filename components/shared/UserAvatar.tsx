import { ComponentProps } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSession } from 'next-auth/react';
import defaultAvatar from '../../public/user-round.png';
import { Skeleton } from '@/components/ui/skeleton';

type UserAvatarProps = ComponentProps<typeof Avatar> & {
  user?: {
    name?: string | null;
    email?: string | null;
    imageUrl?: string | null;
  };
};

export function UserAvatar({ user: propUser, ...props }: UserAvatarProps) {
  const { data: session, status } = useSession();
  const user = propUser || session?.user;

  if (status === 'loading' && !propUser) {
    return <Skeleton className='rounded-full h-10 w-10' />;
  }

  const name = user?.name?.trim();
  const email = user?.email;
  const image = user?.imageUrl;

  const initials =
    (name ?? email ?? '')
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part?.[0]?.toUpperCase() ?? '')
      .join('') || 'U';

  return (
    <Avatar {...props} title={name ?? email ?? 'User'}>
      <AvatarImage src={image ?? defaultAvatar.src} alt={name ?? 'User'} />
      <AvatarFallback className='bg-primary/10'>{initials}</AvatarFallback>
    </Avatar>
  );
}
