import { AxiosResponse } from 'axios';
import { ConversationDetail } from 'src/types';
import { API } from '.';

const PATH = '/conversation';
export const conversationAPI = {
  getConversationsByUserId: async () => {
    const res: AxiosResponse<ConversationDetail[]> = await API.get(PATH);
    return res;
  },
  getConversationById: async (conversationId: string) => {
    const res: AxiosResponse<ConversationDetail> = await API.get(
      `${PATH}/${conversationId}`
    );
    return res;
  },
};
