import { User } from '@prisma/client';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { socket } from 'src/api';
import { USER } from 'src/constants/socket.constant';
import { useUserStore } from 'src/store';

export default function Home() {
  const { user } = useUserStore();

  useEffect(() => {
    function handleUserConnection(data: User) {
      console.log(data, user);
      if (!user) return;
      if (data.id === user.id) {
        console.log('User connected', data);
      }
    }

    socket.on(USER['user-connected'], handleUserConnection);
    socket.on(USER['user-disconnected'], handleUserConnection);

    return () => {
      socket.off(USER['user-connected'], handleUserConnection);
      socket.off(USER['user-disconnected'], handleUserConnection);
    };
  }, []);

  return (
    <div className='flex flex-col gap-8 h-screen w-full justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-3 w-400 p-8 rounded-md bg-dark'>
        <div>avatar</div>
        <h3>
          {user?.firstName} {user?.lastName}
        </h3>
        <p>0 new message</p>
      </div>
      <Link to='/conversations'>Go to conversation</Link>
    </div>
  );
}
