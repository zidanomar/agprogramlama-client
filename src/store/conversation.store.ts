import { Message } from '@prisma/client';
import { ConversationDetail, ConversationWithUsers } from 'src/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IConversationStore {
  conversations: ConversationWithUsers[];
  conversation: ConversationDetail | null;
  setConversations: (conversations: ConversationWithUsers[]) => void;
  updateConversations: (conversation: ConversationWithUsers) => void;
  setConversation: (conversation: ConversationDetail) => void;
  setMessage: (message: Message) => void;
}

// User store
export const useConversationStore = create<IConversationStore>(
  // @ts-ignore
  devtools((set) => ({
    conversations: [],
    conversation: null,
    setConversations: (payload: ConversationWithUsers[]) =>
      set({ conversations: payload }),
    updateConversations: (conversation: ConversationWithUsers) => {
      const { conversations } = useConversationStore.getState();
      const index = conversations.findIndex((c) => c.id === conversation.id);
      if (typeof index !== 'undefined' && index >= 0) {
        const newState = [
          conversation,
          ...conversations.slice(0, index),
          ...conversations.slice(index + 1),
        ];
        set({ conversations: newState });
      } else {
        set({ conversations: [conversation, ...conversations] });
      }
    },
    setConversation: (payload: ConversationDetail) => {
      set({ conversation: payload });
    },
    setMessage: (message: Message) => {
      const { conversation } = useConversationStore.getState();
      if (conversation) {
        if (conversation.id === message.conversationId) {
          set({
            conversation: {
              ...conversation,
              messages: [...conversation.messages, message],
            },
          });
        }
      }
    },
  }))
);
