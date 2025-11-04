'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';
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
  onDelete,
}: JobDescriptionCardProps & { onDelete?: () => void }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Get first 200 characters of description for preview
  const previewText =
    description.length > 200
      ? `${description.substring(0, 200)}...`
      : description;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/job-info/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      // Call the onDelete callback if provided
      if (onDelete) {
        onDelete();
      } else {
        // If no onDelete callback, refresh the page
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Card className='h-full flex flex-col'>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle className='text-xl'>{name}</CardTitle>
            {title && <p className='text-muted-foreground'>{title}</p>}
          </div>
          <Badge
            variant='outline'
            className={`${
              experience === 'Entry'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : experience === 'Mid'
                ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
            }`}
          >
            {experience} Level
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='grow'>
        <p className='text-muted-foreground line-clamp-4'>{previewText}</p>
      </CardContent>
      <CardFooter className='flex justify-between pt-4 border-t'>
        <Button variant='outline' size='sm' asChild>
          <Link href={`/dashboard/job-infos/${id}`}>
            <ExternalLink className='h-4 w-4 mr-2' />
            View Details
          </Link>
        </Button>
        <div className='space-x-2'>
          <Button variant='outline' size='icon' asChild>
            <Link href={`/dashboard/job-infos/${id}/edit`}>
              <Edit className='h-4 w-4' />
              <span className='sr-only'>Edit</span>
            </Link>
          </Button>
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button variant='outline' size='icon' disabled={isDeleting}>
                {isDeleting ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <Trash2 className='h-4 w-4 text-destructive' />
                )}
                <span className='sr-only'>Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  job &quot;{name}&quot; and all its associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
