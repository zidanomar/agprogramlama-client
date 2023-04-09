import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { conversationAPI, socket } from 'src/api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import Message from 'src/components/Message';
import { MESSAGE } from 'src/constants/socket.constant';
import { useDisclosure, useScrollToBottom } from 'src/hooks';
import { useUserStore } from 'src/store';
import { ConversationDetail, MessageDetail, SendMessage } from 'src/types';
export default function MessagePage() {
  const [conversation, setConversation] = useState<ConversationDetail | null>(
    null
  );
  const [message, setMessage] = useState('');

  const { conversationId } = useParams();
  const { user } = useUserStore();
  const [loading, onLoading, onLoaded] = useDisclosure();
  const scrollRef = useScrollToBottom(conversation);

  const sendMessage = () => {
    if (!user || !message) return;
    const messageBody: SendMessage = {
      sender: user,
      receivers: conversation!.users.filter((u) => u.id !== user.id),
      content: message,
    };
    socket.emit(MESSAGE['send-message'], messageBody);
    setMessage('');
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
    } catch (error) {
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
      setConversation((prev) => ({
        ...prev!,
        messages: [...prev!.messages, data],
      }));
    }

    socket.on(MESSAGE['receive-message'], receiveMessageHandler);
    socket.on(MESSAGE['message-sended'], receiveMessageHandler);

    return () => {
      socket.off(MESSAGE['receive-message'], receiveMessageHandler);
      socket.off(MESSAGE['message-sended'], receiveMessageHandler);
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className='flex flex-col gap-8 h-full w-full'>
      <div className='h-full flex flex-col gap-8 overflow-auto pr-4'>
        {conversation?.messages.map((message) => (
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
          value={message}
          className='bg-transparent text-white'
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button disabled={!message} onClick={sendMessage}>
          send
        </Button>
      </div>
    </div>
  );
}
