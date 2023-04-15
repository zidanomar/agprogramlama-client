import React, { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import Dropdown from 'src/components/Dropdown';
import Input from 'src/components/Input';

import { ConversationType, User } from '@prisma/client';
import { CONVERSATION, MESSAGE } from 'src/constants/socket.constant';
import { useConversationStore, useUserStore } from 'src/store';
import { conversationAPI, socket, userAPI } from 'src/api';
import { ConversationWithUsers } from 'src/types';

export default function BroadcastPage() {
  const [receiverOption, setReceiverOption] = useState<User[]>([]);
  const [receivers, setReceivers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { user } = useUserStore();
  const { updateConversations } = useConversationStore();

  const fetchRecivers = async () => {
    setLoading(true);
    try {
      const { data, status } = await userAPI.getReceivers();

      if (status === 200) {
        setReceiverOption(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectReciverHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const reciver = JSON.parse(e.target.value) as User;
    setReceivers((prev) => {
      if (prev.some((item) => item.id === reciver.id)) {
        return prev;
      } else {
        return [...prev, reciver];
      }
    });
  };

  const sendMessageHandler = async () => {
    if (!message || !user) return;

    try {
      const { data } = await conversationAPI.sendBroadcastMessage({
        content: message,
        sender: user,
        receivers: receivers,
        type: 'PERSONAL',
      });

      setReceivers([]);
      setMessage('');

      data.forEach((c) => {
        updateConversations(c);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecivers();
  }, []);

  useEffect(() => {
    function handleBroadcastMessage(data: ConversationWithUsers) {
      updateConversations(data);
    }

    socket.on(CONVERSATION['broadcast-sent'], handleBroadcastMessage);

    return () => {
      socket.off(CONVERSATION['broadcast-sent'], handleBroadcastMessage);
    };
  }, []);

  return (
    <div className='flex flex-col relative gap-8 h-full w-full'>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <Dropdown
            values={receiverOption.map((receiver) => ({
              value: JSON.stringify(receiver),
              label: `${receiver.firstName} ${receiver.lastName}`,
            }))}
            multiple={true}
            onChange={selectReciverHandler}
          />
        </div>
      )}

      <p>send to:</p>

      {receivers.length > 0 && (
        <div className='flex flex-col gap-4'>
          {receivers.map((receiver) => (
            <p key={receiver.id}>
              {receiver.firstName} {receiver.lastName}
            </p>
          ))}
        </div>
      )}

      <div className='w-full flex absolute bottom-0 gap-8'>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='bg-transparent text-white'
        />
        <Button
          disabled={!receivers.length || !message}
          onClick={sendMessageHandler}
        >
          send
        </Button>
      </div>
    </div>
  );
}
