import {
  Interview,
  CreateInterviewDto,
  UpdateInterviewDto,
} from '@/types/interview';

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || '';

export const getInterview = async (id: string): Promise<Interview> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/interviews/${id}`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching interview:', error);
    throw error;
  }
};

export const createInterview = async (
  payload: CreateInterviewDto
): Promise<Interview> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/interviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to create interview');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating interview:', error);
    throw error;
  }
};

export const updateInterview = async (
  id: string,
  payload: UpdateInterviewDto
): Promise<Interview> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/interviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to update interview');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating interview:', error);
    throw error;
  }
};

export const deleteInterview = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/interviews/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete interview');
    }
  } catch (error) {
    console.error('Error deleting interview:', error);
    throw error;
  }
};

export const getInterviewsByJobInfo = async (
  jobInfoId: string
): Promise<Interview[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/job-info/${jobInfoId}/interviews`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch interviews for job info');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching interviews by job info:', error);
    throw error;
  }
};
