import { API } from '.';
import { AxiosResponse } from 'axios';
import { User } from '@prisma/client';
import { UserAuth } from 'src/types';

const PATH = '/users';

export const userAPI = {
  getCurrentUser: async (): Promise<UserAuth> => {
    const { data } = await API.get('/users', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return data;
  },
  getReceivers: async (): Promise<AxiosResponse<User[]>> => {
    const response = await API.get(PATH + '/receivers');

    return response;
  },
};
