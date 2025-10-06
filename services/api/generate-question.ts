import axios from 'axios';
export const generateQuestion = async (id: string, difficulty: string) => {
    try {
        const response = await axios.post(`/api/job-info/questions/generate-question`,
            { jobInfoId: id, difficulty },
        );

        if (response.status !== 200) {
            throw new Error('Failed to generate question');
        }

        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error generating question:', error);
        throw error;
    }
};
