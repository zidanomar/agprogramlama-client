import { User } from '@prisma/client';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { conversationAPI, socket } from 'src/api';
import { USER } from 'src/constants/socket.constant';
import { useDisclosure } from 'src/hooks';
import { useConversationStore, useUserStore } from 'src/store';
import Button from '../Button';
import PersonalChat from '../PersonalChat';

export default function SideMenu() {
  const { user, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, onLoading, onLoaded] = useDisclosure();

  const { conversations, setConversations } = useConversationStore();

  const logoutHandler = () => {
    localStorage.removeItem('access_token');
    clearUser();
    socket.disconnect();
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

  useEffect(() => {
    function handleUserConnection(data: User) {
      const updatedConversations = conversations.map((conversation) => {
        if (conversation.type === 'PERSONAL') {
          const updatedUsers = conversation.users.map((u) => {
            if (u.id === data.id) {
              return data;
            }
            return u;
          });
          return { ...conversation, users: updatedUsers };
        }
        return conversation;
      });

      setConversations(updatedConversations);
    }

    socket.on(USER['user-connected'], handleUserConnection);
    socket.on(USER['user-disconnected'], handleUserConnection);

    return () => {
      socket.off(USER['user-connected'], handleUserConnection);
      socket.off(USER['user-disconnected'], handleUserConnection);
    };
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
          conversations.map((conversation) =>
            conversation.type === 'PERSONAL' ? (
              <PersonalChat
                conversationId={conversation.id}
                isOnline={
                  conversation.users.find((u) => u.id !== user?.id)?.socketId
                    ? true
                    : false
                }
                key={conversation.id}
                name={conversation.users.find((u) => u.id !== user?.id)?.email}
              />
            ) : (
              <p>group</p>
            )
          )}
      </div>
      <div className='flex justify-center items-center'>
        <Button onClick={logoutHandler}>logout</Button>
      </div>
    </div>
  );
}
