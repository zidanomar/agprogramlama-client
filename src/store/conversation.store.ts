import { Message } from '@prisma/client';
import { ConversationDetail } from 'src/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IConversationStore {
  conversations: ConversationDetail[];
  conversation: ConversationDetail | null;
  setConversations: (conversations: ConversationDetail[]) => void;
  setConversation: (conversation: ConversationDetail) => void;
  setNewMessage: (newMessage: Message) => void;
}

// User store
export const useConversationStore = create<IConversationStore>(
  // @ts-ignore
  devtools((set) => ({
    conversations: [],
    conversation: null,
    setConversations: (conversations: ConversationDetail[]) =>
      set({ conversations }),
    setConversation: (conversation: ConversationDetail) =>
      set({ conversation }),
    setNewMessage: (newMessage: Message) => {
      const { conversation } = useConversationStore.getState();
      if (conversation) {
        const { messages } = conversation;
        set({
          conversation: {
            ...conversation,
            messages: [...messages, newMessage],
          },
        });
      }
    },
  }))
);
