import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_API_BASE_URL, {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
  },
});
