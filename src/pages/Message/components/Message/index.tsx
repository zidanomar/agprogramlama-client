import { useEffect, useState } from 'react';

import { socket } from 'src/api';
import Button from 'src/components/Button';

export default function Message() {
  const [message, setMessage] = useState<string>('');

  const handleClick = () => {
    socket.emit('message', '54e2d968-8a82-49cf-86b7-6a50b7e80380');
  };

  useEffect(() => {
    function onMessage(data: string) {
      setMessage(data);
    }

    socket.on('connect', () => {
      console.log(socket.connected); // true
    });

    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
      socket.on('disconnect', () => {
        console.log(socket.connected); // false
      });
    };
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <Button onClick={handleClick}>send</Button>
    </div>
  );
}
