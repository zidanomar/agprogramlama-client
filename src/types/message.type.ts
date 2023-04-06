import { User } from '@prisma/client';

export type SendMessage = {
  sender: User;
  receivers: User[];
  content: string;
};
