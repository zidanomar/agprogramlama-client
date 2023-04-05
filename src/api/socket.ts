import { io } from 'socket.io-client';

const ACCESS_TOKEN = localStorage.getItem('access_token');

export const socket = io(import.meta.env.VITE_API_BASE_URL, {
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
