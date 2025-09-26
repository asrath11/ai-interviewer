'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const themeOptions = [
  {
    name: 'Light',
    value: 'light',
    icon: Sun,
  },
  {
    name: 'Dark',
    value: 'dark',
    icon: Moon,
  },
  {
    name: 'System',
    value: 'system',
    icon: Monitor,
  },
];
export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant='ghost' size='icon' className='w-10 px-0' disabled>
        <Sun className='h-5 w-5' />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='w-10 px-0'>
          {theme === 'light' ? (
            <Sun className='h-5 w-5' />
          ) : theme === 'dark' ? (
            <Moon className='h-5 w-5' />
          ) : (
            <Monitor className='h-5 w-5' />
          )}
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {themeOptions.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
          >
            <themeOption.icon className='mr-2 h-4 w-4' />
            <span>{themeOption.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
