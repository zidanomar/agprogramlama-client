import axios from 'axios';
import { io } from 'socket.io-client';

import { User, UserLogin, UserRegister } from 'src/types';

const URL = import.meta.env.VITE_API_BASE_URL;
const ACCESS_TOKEN = localStorage.getItem('access_token');

export const socket = io(URL, {
  extraHeaders: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

socket.on('connect', () => {
  console.log('Connected to server!');
});

socket.on('events', (data) => {
  console.log(data);
});

export const API = axios.create({
  baseURL: URL + '/api',
  timeout: 1000 * 60,
});

API.interceptors.request.use((req) => {
  if (ACCESS_TOKEN) {
    req.headers['authorization'] = `Bearer ${ACCESS_TOKEN}`;
  }

  return req;
});

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await API.get('/users', {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  return data;
};

export const login = async ({
  email,
  password,
}: UserLogin): Promise<{ access_token: string; user: User }> => {
  const { data } = await API.post('/auth/login', { email, password });

  return data;
};

export const register = async ({
  email,
  password,
  firstName,
  lastName,
  imageUri,
}: UserRegister): Promise<{ access_token: string; user: User }> => {
  const { data } = await API.post('/auth/register', {
    email,
    password,
    firstName,
    lastName,
    imageUri,
  });

  return data;
};
