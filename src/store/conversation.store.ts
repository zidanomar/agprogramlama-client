import { ConversationWithUsers } from 'src/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IConversationStore {
  conversations: ConversationWithUsers[];
  setConversations: (conversations: ConversationWithUsers[]) => void;
  updateConversations: (conversation: ConversationWithUsers) => void;
}

// User store
export const useConversationStore = create<IConversationStore>(
  // @ts-ignore
  devtools((set) => ({
    conversations: [],
    setConversations: (payload: ConversationWithUsers[]) =>
      set({ conversations: payload }),
    updateConversations: (conversation: ConversationWithUsers) => {
      const { conversations } = useConversationStore.getState();
      const index = conversations.findIndex((c) => c.id === conversation.id);
      console.log(conversation);
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
  }))
);
