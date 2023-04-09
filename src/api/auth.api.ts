import { API } from '.';
import { UserAuth, UserLogin, UserRegister } from 'src/types';
import { User } from '@prisma/client';

export const login = async ({
  email,
  password,
}: UserLogin): Promise<{ access_token: string; user: UserAuth }> => {
  const { data } = await API.post('/auth/login', { email, password });

  return data;
};

export const register = async ({
  email,
  password,
  firstName,
  lastName,
  imageUri,
}: UserRegister): Promise<{ access_token: string; user: UserAuth }> => {
  const { data } = await API.post('/auth/register', {
    email,
    password,
    firstName,
    lastName,
    imageUri,
  });

  return data;
};
