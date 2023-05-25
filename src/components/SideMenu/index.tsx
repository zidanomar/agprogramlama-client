import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { conversationAPI, socket } from 'src/api';
import { CONVERSATION } from 'src/constants/socket.constant';
import { useDisclosure } from 'src/hooks';
import { useConversationStore, useUserStore } from 'src/store';
import { ConversationWithUsers } from 'src/types';
import Button from '../Button';
import GroupChat from '../GroupChat/GroupChat';
import PersonalChat from '../PersonalChat';

export default function SideMenu() {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, onLoading, onLoaded] = useDisclosure();

  const { conversations, setConversations, updateConversations } =
    useConversationStore();

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
    function newConversationHandler(conversation: ConversationWithUsers) {
      updateConversations(conversation);
    }
    socket.on(CONVERSATION['conversation-created'], newConversationHandler);

    return () => {
      socket.off(CONVERSATION['conversation-created'], newConversationHandler);
    };
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <div className='h-24'>
        <Link to='/'>
          <h4>
            {user?.firstName} {user?.lastName}
          </h4>
        </Link>
      </div>
      <Link to='/conversations'>
        <h3>Conversations</h3>
      </Link>
      <div className='flex flex-col gap-4 h-full my-8 pr-2 overflow-auto'>
        {isLoading && <div>Loading...</div>}
        {conversations &&
          conversations.map((conversation) =>
            conversation.type === 'PERSONAL' ? (
              <PersonalChat
                key={conversation.id}
                conversationId={conversation.id}
                isOnline={
                  conversation.users.find((u) => u.id !== user?.id)?.socketId
                    ? true
                    : false
                }
                name={conversation.users.find((u) => u.id !== user?.id)?.email}
              />
            ) : (
              <GroupChat
                key={conversation.id}
                conversationId={conversation.id}
                name={conversation.name}
                users={conversation.users}
              />
            )
          )}
      </div>
      <div className='flex justify-center items-center'>
        <Button onClick={logoutHandler}>logout</Button>
      </div>
    </div>
  );
}
