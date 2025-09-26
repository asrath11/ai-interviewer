'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type ExperienceLevel = 'Entry' | 'Mid' | 'Senior';

interface JobDescriptionCardProps {
  id: string;
  name: string;
  title?: string;
  experience: ExperienceLevel;
  description: string;
}

export function JobDescriptionCard({
  id,
  name,
  title,
  experience,
  description,
}: JobDescriptionCardProps) {
  const getExperienceBadgeVariant = (level: ExperienceLevel) => {
    switch (level) {
      case 'Entry':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Mid':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'Senior':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className='w-full h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg'>
      <div className='flex-1 flex flex-col'>
        <CardHeader className='pb-2 flex-shrink-0'>
          <div className='flex justify-between items-start gap-2'>
            <div className='min-h-[40px] flex flex-col justify-center'>
              <CardTitle className='text-xl font-bold'>{name}</CardTitle>
              {title && <p className='text-muted-foreground mt-1'>{title}</p>}
            </div>
            <Badge
              className={`${getExperienceBadgeVariant(
                experience
              )} font-medium flex-shrink-0`}
            >
              {experience} Level
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='pb-4 flex-1'>
          <p className='text-muted-foreground line-clamp-3'>{description}</p>
        </CardContent>
      </div>
      <CardFooter className='border-t px-6 py-3 flex-shrink-0'>
        <Button
          variant='ghost'
          size='sm'
          asChild
          className='w-full justify-start'
        >
          <Link
            href={`/dashboard/job-infos/${id}`}
            className='flex items-center gap-1'
          >
            View Details <ExternalLink className='h-4 w-4 ml-1' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
