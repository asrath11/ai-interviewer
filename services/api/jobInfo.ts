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

export const updateJobInfo = async (
  id: string,
  payload: Pick<JobInfo, 'name' | 'title' | 'description' | 'experience'>
): Promise<JobInfo> => {
  try {
    const response = await fetch(`/api/job-info/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to update job info');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating job info:', error);
    throw error;
  }
};
