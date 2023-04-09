import { Conversation } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { conversationAPI } from 'src/api';
import { useAuth, useDisclosure } from 'src/hooks';
import Button from '../Button';

export default function SideMenu() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, onLoading, onLoaded] = useDisclosure();

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const logoutHandler = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    navigate('/login');
  };

  const fetchConversations = async () => {
    onLoading();
    try {
      const res = await conversationAPI.getConversationsByUserId();

      if (res.statusText !== 'OK')
        throw new Error('Error fetching conversations.');

      setConversations(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      onLoaded();
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <div className='h-24'>
        <div>{user?.firstName}</div>
      </div>
      <Link to='/conversations'>Conversations</Link>
      <div className='flex flex-col gap-4 h-full my-8 overflow-auto'>
        {isLoading && <div>Loading...</div>}
        {conversations &&
          conversations.map((conversation) => (
            <Link key={conversation.id} to={conversation.id}>
              {conversation.name}
            </Link>
          ))}
      </div>
      <div className='flex justify-center items-center'>
        <Button onClick={logoutHandler}>logout</Button>
      </div>
    </div>
  );
}
