import { User } from '@prisma/client';

export function handleUserLogin(data: User, users: User[], callback: Function) {
  const index = users.findIndex((u) => u.id === data.id);

  const newState = [...users];
  newState[index] = data;

  callback(newState);
}
