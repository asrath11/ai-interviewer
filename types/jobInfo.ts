// types/jobInfo.ts
export interface JobInfo {
  id: string;
  name: string;
  title?: string;
  description?: string;
  experience?: 'Entry' | 'Mid' | 'Senior';
}
