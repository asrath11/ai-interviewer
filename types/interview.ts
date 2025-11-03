export interface Interview {
  id: string;
  jobInfoId: string;
  userId: string;
  humeChatId?: string;
  feedback?: string;
  duration?: string;
  createdAt: Date;
}

export interface CreateInterviewDto {
  jobInfoId: string;
  userId: string;
  humeChatId?: string;
  feedback?: string;
  duration?: string;
}

export interface UpdateInterviewDto {
  humeChatId?: string;
  feedback?: string;
  duration?: string;
}
