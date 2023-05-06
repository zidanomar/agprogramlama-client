import { Conversation, Message, User } from '@prisma/client';

export type SendMessage = {
  sender: User;
  receivers: User[];
  content: string;
};

export type ConversationDetail = Conversation & {
  users: User[];
  messages: Message[];
};

export type MessageDetail = Message & {
  conversation: Conversation;
  sender: User;
};

export type ConversationWithUsers = Conversation & {
  users: User[];
};
