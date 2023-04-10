import { ConversationDetail } from 'src/types';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface IConversationStore {
  conversations: ConversationDetail[];
  setConversations: (conversations: ConversationDetail[]) => void;
}

// User store
export const useConversationStore = create<IConversationStore>(
  // @ts-ignore
  devtools((set) => ({
    user: null,
    setConversations: (conversations: ConversationDetail[]) =>
      set({ conversations }),
  }))
);
