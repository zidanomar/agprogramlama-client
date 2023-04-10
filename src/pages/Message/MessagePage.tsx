import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from 'src/api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import Message from 'src/components/Message';
import { MESSAGE } from 'src/constants/socket.constant';
import { useDisclosure, useScrollToBottom } from 'src/hooks';
import { useConversationStore, useUserStore } from 'src/store';
import { MessageDetail, SendMessage } from 'src/types';
export default function MessagePage() {
  const { conversation, conversations, setConversation, setNewMessage } =
    useConversationStore();
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

      const conversation = conversations.find((c) => c.id === conversationId);
      if (!conversation) throw new Error('Conversation not found.');
      setConversation(conversation);
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
      setNewMessage({
        id: data.id,
        content: data.content,
        senderId: data.senderId,
        conversationId: data.conversationId,
        seen: data.seen,
        sentAt: data.sentAt,
      });
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
