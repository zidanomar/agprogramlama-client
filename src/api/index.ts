import axios from 'axios';
import { io } from 'socket.io-client';

import { IUserLogin, IUserRegister } from 'src/interfaces';

const URL = import.meta.env.VITE_API_BASE_URL;

export const socket = io(URL);
export const API = axios.create({
  baseURL: URL + '/api',
  timeout: 1000 * 60,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    req.headers['authorization'] = `Bearer ${token}`;
  }

  return req;
});

export const getCurrentUser = async () => {
  const { data } = await API.get('/users');

  return data;
};

export const login = async ({
  email,
  password,
}: IUserLogin): Promise<{ access_token: string }> => {
  const { data } = await API.post('/auth/login', { email, password });

  return data;
};

export const register = async ({
  email,
  password,
  firstName,
  lastName,
  imageUri,
}: IUserRegister): Promise<{ access_token: string }> => {
  const { data } = await API.post('/users/register', {
    email,
    password,
    firstName,
    lastName,
    imageUri,
  });

  return data;
};
