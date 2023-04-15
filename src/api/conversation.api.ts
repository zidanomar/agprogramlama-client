import { ConversationType, User } from '@prisma/client';
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
  // ===================== POST =====================
  createGroupConversation: async (data: CreateGroupConversationDto) => {
    const res: AxiosResponse<ConversationWithUsers> = await API.post(
      `${PATH}/new-group`,
      data
    );
    return res;
  },

  sendBroadcastMessage: async (data: SendBroadcastMessageDto) => {
    const res: AxiosResponse<ConversationWithUsers[]> = await API.post(
      `${PATH}/broadcast`,
      data
    );
    return res;
  },
};
