import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { conversationAPI, socket } from 'src/api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import Message from 'src/components/Message';
import { MESSAGE } from 'src/constants/socket.constant';
import { useDisclosure, useScrollToBottom } from 'src/hooks';
import { useConversationStore, useUserStore } from 'src/store';
import { MessageDetail, SendMessage } from 'src/types';
export default function MessagePage() {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { conversationId } = useParams();
  const { user } = useUserStore();
  const [loading, onLoading, onLoaded] = useDisclosure();
  useConversationStore();
  const { conversation, setMessage, setConversation } = useConversationStore();
  const scrollRef = useScrollToBottom(conversation?.messages);

  const sendMessage = async () => {
    if (!user || !content || !conversation) return;
    try {
      const messageBody = {
        sender: user,
        content,
        conversation,
      };

      const { data } = await conversationAPI.sendMessage(messageBody);
      setMessage(data);
    } catch (error) {
      console.error(error);
    } finally {
      setContent('');
    }
  };

  const fetchConversations = async (id: string) => {
    onLoading();
    try {
      if (!conversationId) throw new Error('No conversation id provided.');

      const { statusText, data } = await conversationAPI.getConversationById(
        id
      );
      if (statusText !== 'OK') throw new Error('Error fetching messages.');
      setConversation(data);
    } catch (error: any) {
      if (error.response) {
        // Handle response error
        setError(error.response.data.message);
      } else if (error.request) {
        // Handle request error
        setError('Request failed. Please try again later.');
      } else {
        // Handle other errors
        setError('An error occurred. Please try again later.');
      }
    } finally {
      onLoaded();
    }
  };

  useEffect(() => {
    if (!conversationId) return;
    fetchConversations(conversationId);
  }, [conversationId]);

  useEffect(() => {
    function receiveMessageHandler(data: MessageDetail) {
      setMessage(data);
    }

    socket.on(MESSAGE['new-message'], receiveMessageHandler);

    return () => {
      socket.off(MESSAGE['new-message'], receiveMessageHandler);
    };
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className='flex flex-col gap-8 h-full w-full'>
      <div className='h-full flex flex-col gap-8 overflow-auto pr-4'>
        {conversation?.messages?.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            primary={user?.id === message.senderId}
          />
        ))}
        <div ref={scrollRef} />
      </div>

      <div className='w-full flex gap-8'>
        <Input
          value={content}
          className='bg-transparent text-white'
          onChange={(e) => setContent(e.target.value)}
        />
        <Button disabled={!content} onClick={sendMessage}>
          send
        </Button>
      </div>
    </div>
  );
}
