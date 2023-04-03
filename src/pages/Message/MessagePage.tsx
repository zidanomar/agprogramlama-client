import { useEffect, useState } from 'react';
// import { socket } from 'src/api';
import io from 'socket.io-client';

export const socket = io('localhost:8080', {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
export default function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [cpuUsage, setCpuUsage] = useState(0);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('peformance', (data) => {
      setCpuUsage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // @ts-ignore
  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', messageInput);
    setMessageInput('');
  };

  return (
    <div>
      <h1>Realtime Chat</h1>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type='text'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type='submit'>Send</button>
        <h1>CPU Usage: {cpuUsage}%</h1>
      </form>
    </div>
  );
}
