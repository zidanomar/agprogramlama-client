import { UserLogin, UserRegister, UserAuth } from 'src/types';
import { API } from '.';

const PATH = '/auth';
export const authAPI = {
  login: async ({
    email,
    password,
  }: UserLogin): Promise<{ access_token: string; user: UserAuth }> => {
    const { data } = await API.post(`${PATH}/login`, {
      email,
      password,
    });

    return data;
  },
  register: async ({
    email,
    password,
    firstName,
    lastName,
    imageUri,
  }: UserRegister): Promise<{ access_token: string; user: UserAuth }> => {
    const { data } = await API.post(`${PATH}/register`, {
      email,
      password,
      firstName,
      lastName,
      imageUri,
    });

    return data;
  },
};
