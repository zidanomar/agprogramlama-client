import { API } from '.';
import { AxiosResponse } from 'axios';
import { User } from '@prisma/client';
import { UserAuth } from 'src/types';

export const getCurrentUser = async (): Promise<UserAuth> => {
  const { data } = await API.get('/users', {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  return data;
};

export const getReceivers = async (): Promise<AxiosResponse<User[]>> => {
  const response = await API.get('/users/receivers');

  return response;
};
