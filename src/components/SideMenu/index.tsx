import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks';
import Button from '../Button';

export default function SideMenu() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    navigate('/login');
  };
  return (
    <div className='flex flex-col h-full'>
      <div className='h-24'>
        <div>{user?.firstName}</div>
      </div>
      <div className='flex flex-col gap-4 h-full my-8 overflow-auto'>
        {/* get conversations */}
      </div>
      <div className='flex justify-center items-center'>
        <Button onClick={logoutHandler}>logout</Button>
      </div>
    </div>
  );
}
