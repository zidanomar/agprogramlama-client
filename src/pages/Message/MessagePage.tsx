import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import SideMenu from './components/SideMenu';
import * as API from 'src/api';

const socket = API.socket;

export default function MessagePage() {
  // const {
  //   data: user,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: API.getCurrentUser,
  //   staleTime: Infinity,
  //   retry: false,
  // });

  // if (isLoading) {
  //   return <div>loading</div>;
  // }

  // if (error) {
  //   return <Navigate to='/login' />;
  // }

  useEffect(() => {
    function onConnect() {
      console.log('connected');
    }

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, [socket]);

  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/5 h-screen max-h-screen bg-dark overflow-y-auto'>
        <SideMenu />
      </div>
      <div className='w-4/5 h-screen max-h-screen bg-darkest overflow-y-auto'>
        {/* <div>{user.email}</div> */}
      </div>
    </div>
  );
}
