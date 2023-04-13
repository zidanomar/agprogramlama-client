import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { socket, userAPI } from 'src/api';
import { USER } from 'src/constants/socket.constant';
import { useConversationStore, useUserStore } from 'src/store';
export default function MainLayout() {
  const { user, setUser, clearUser } = useUserStore();
  const { conversations, setConversations } = useConversationStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getUser = async () => {
    setIsLoading(true);
    try {
      const user = await userAPI.getCurrentUser();

      setUser(user);
      setIsLoading(false);
    } catch (error) {
      clearUser();
      setIsLoading(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    function handleUserConnection(data: User) {
      if (!user) return;
      if (user.id === data.id) {
        const currUser = { ...user, socketId: data.socketId };
        setUser(currUser);
      } else {
        const updatedConversations = conversations.map((conversation) => {
          if (conversation.type === 'PERSONAL') {
            const updatedUsers = conversation.users.map((user) => {
              if (user.id === data.id) {
                return { ...user, socketId: data.socketId };
              }
              return user;
            });
            return { ...conversation, users: updatedUsers };
          }
          return conversation;
        });

        setConversations(updatedConversations);
      }
    }

    socket.on(USER['user-connected'], handleUserConnection);
    socket.on(USER['user-disconnected'], handleUserConnection);

    return () => {
      socket.off(USER['user-connected'], handleUserConnection);
      socket.off(USER['user-disconnected'], handleUserConnection);
    };
  }, [user, conversations]);
  return <main>{isLoading ? <div>Loading...</div> : <Outlet />}</main>;
}
