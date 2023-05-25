import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useUserStore } from 'src/store';
import * as API from 'src/api';
import { useDisclosure } from 'src/hooks';
import { MESSAGE } from 'src/constants/socket.constant';

export default function Home() {
  const { user } = useUserStore();

  const [count, setCount] = useState(0);
  const [loading, setLoading, setLoaded] = useDisclosure();

  useEffect(() => {
    const fetchUnseenMessages = async () => {
      setLoading();
      try {
        const { data } = await API.conversationAPI.getUnseenMessages();
        setCount(data);
      } catch (err) {
        setCount(0);
      } finally {
        setLoaded();
      }
    };

    fetchUnseenMessages();
  }, []);

  useEffect(() => {
    function receiveMessageHandler() {
      console.log('new message');
      setCount((c) => c + 1);
    }

    API.socket.on(MESSAGE['new-message'], receiveMessageHandler);

    return () => {
      API.socket.off(MESSAGE['new-message'], receiveMessageHandler);
    };
  }, []);

  return (
    <div className='flex flex-col gap-8 h-screen w-full justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-3 w-400 p-8 rounded-md bg-dark'>
        <div>avatar</div>
        <h3>
          {user?.firstName} {user?.lastName}
        </h3>
        <p>{loading ? 'checking new messagess...' : `${count} new messages`}</p>
      </div>
      <Link to='/conversations'>Go to conversation</Link>
    </div>
  );
}
