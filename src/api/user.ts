import { API } from '.';
import { ErrorResponse, User } from 'src/types';
import { AxiosResponse } from 'axios';

export const getCurrentUser = async (): Promise<User> => {
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
