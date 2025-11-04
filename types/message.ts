export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp?: Date;
}

export interface APIMessage {
  type: 'assistant_message' | 'user_message' | 'AGENT_MESSAGE' | 'USER_MESSAGE';
  transcript?: string;
  message: {
    content: string;
  };
  id?: string;
  role?: 'user' | 'assistant' | 'system';
  receivedAt?: Date;
}
