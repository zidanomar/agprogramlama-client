import { Message, User } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { ConversationDetail, ConversationWithUsers } from 'src/types';
import { API } from '.';

export type CreateGroupConversationDto = {
  sender: User;
  receivers: User[];
  name: string;
  type: 'GROUP';
};

export type SendBroadcastMessageDto = {
  sender: User;
  receivers: User[];
  content: string;
  type: 'PERSONAL';
};

const PATH = '/conversation';
export const conversationAPI = {
  // ===================== GET =====================
  getConversationsByUserId: async () => {
    const res: AxiosResponse<ConversationWithUsers[]> = await API.get(PATH);
    return res;
  },
  getConversationById: async (conversationId: string) => {
    const res: AxiosResponse<ConversationDetail> = await API.get(
      `${PATH}/${conversationId}`
    );
    return res;
  },
  getUnseenMessages: async () => {
    const res: AxiosResponse<number> = await API.get(`${PATH}/unseen-messages`);
    return res;
  },
  // ===================== POST =====================
  sendMessage: async (data: {
    sender: User;
    content: string;
    conversation: ConversationWithUsers;
  }) => {
    const res: AxiosResponse<Message> = await API.post(
      `${PATH}/personal-message`,
      data
    );
    return res;
  },

  createGroupConversation: async (data: CreateGroupConversationDto) => {
    const res: AxiosResponse<ConversationWithUsers> = await API.post(
      `${PATH}/new-group`,
      data
    );
    return res;
  },

  sendBroadcastMessage: async (data: SendBroadcastMessageDto) => {
    const res: AxiosResponse<
      { conversation: ConversationWithUsers; message: Message }[]
    > = await API.post(`${PATH}/broadcast`, data);
    return res;
  },
};
