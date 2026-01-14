import axios from 'axios';

export const generateFeedback = async (
  jobInfoId: string,
  questionText: string,
  answer: string
) => {
  try {
    const response = await axios.post(
      `/api/job-info/questions/generate-feedback`,
      { jobInfoId, questionText, answer }
    );

    if (response.status !== 200) {
      throw new Error('Failed to generate feedback');
    }

    const data = response.data;
    return data; // Expected to contain { feedback: "..." }
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw error;
  }
};
