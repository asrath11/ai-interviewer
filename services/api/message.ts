import axios from 'axios';

export interface Message {
  type: 'assistant_message' | 'user_message';
  transcript: string;
  message: {
    content: string;
  };
}
const API_URL = process.env.NEXT_PUBLIC_APP_URL;
export const getInterviewMessages = async (
  interviewId: string
): Promise<Message[]> => {
  try {
    const { data: interview } = await axios.get(
      `${API_URL}/api/interviews/${interviewId}`
    );
    const chatId = interview?.humeChatId;

    if (!chatId) {
      throw new Error('No transcript available');
    }

    const { data: events } = await axios.get(`${API_URL}/api/hume/messages`, {
      params: { chatId },
    });

    return (events as any[])
      .filter((e) => e?.type === 'AGENT_MESSAGE' || e?.type === 'USER_MESSAGE')
      .map((e) => ({
        type: e.role === 'AGENT' ? 'assistant_message' : 'user_message',
        transcript: e.messageText,
        message: { content: e.messageText },
      }));
  } catch (error) {
    console.error('Error fetching interview messages:', error);
    throw error;
  }
};
