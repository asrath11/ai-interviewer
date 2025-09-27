import { JobInfo } from '@/types/jobInfo';

export const getJobInfo = async (id: string): Promise<JobInfo> => {
  try {
    const response = await fetch(`/api/job-info/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch job info');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching job info:', error);
    throw error;
  }
};
