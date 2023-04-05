import axios from 'axios';

const ACCESS_TOKEN = localStorage.getItem('access_token');

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  timeout: 1000 * 60,
});

API.interceptors.request.use((req) => {
  if (ACCESS_TOKEN) {
    req.headers['authorization'] = `Bearer ${ACCESS_TOKEN}`;
  }

  return req;
});

export { socket } from './socket';

export { login, register } from './auth';
export { getCurrentUser, getReceivers } from './user';
