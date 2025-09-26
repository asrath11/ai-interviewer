'use client';

import {
  BookOpenIcon,
  BrainCircuitIcon,
  FileSlidersIcon,
  LogOut,
  SpeechIcon,
  User,
} from 'lucide-react';
import { ToggleTheme } from '@/components/ToggleTheme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { UserAvatar } from '@/components/UserAvatar';
import { useParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const navLinks = [
  { name: 'Interviews', href: 'interviews', Icon: SpeechIcon },
  { name: 'Questions', href: 'questions', Icon: BookOpenIcon },
  { name: 'Resume', href: 'resume', Icon: FileSlidersIcon },
];

export function Navbar({ user }: { user: { name: string; imageUrl: string } }) {
  const { jobInfoId } = useParams();
  const pathName = usePathname();

  return (
    <nav className='h-header border-b'>
      <div className='flex h-full items-center justify-between px-10'>
        <Link href='/dashboard' className='flex items-center gap-2'>
          <BrainCircuitIcon className='size-8 text-primary' />
          <span className='text-xl font-bold'>Landr</span>
        </Link>

        <div className='flex items-center gap-4'>
          {typeof jobInfoId === 'string' &&
            navLinks.map(({ name, href, Icon }) => {
              const hrefPath = `/dashboard/job-infos/${jobInfoId}/${href}`;

              return (
                <Button
                  variant={pathName === hrefPath ? 'secondary' : 'ghost'}
                  key={name}
                  asChild
                  className='cursor-pointer max-sm:hidden'
                >
                  <Link href={hrefPath}>
                    <Icon />
                    {name}
                  </Link>
                </Button>
              );
            })}

          <ToggleTheme />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuItem onClick={() => {}}>
                <User className='mr-2' />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className='mr-2' />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
