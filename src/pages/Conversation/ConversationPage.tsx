import React, { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import Dropdown from 'src/components/Dropdown';
import Input from 'src/components/Input';

import * as API from 'src/api';
import { User, Message, Prisma } from '@prisma/client';
import { SendMessage } from 'src/types';
import { MESSAGE } from 'src/constants/socket.constant';
import { useUserStore } from 'src/store';

export default function ConversationPage() {
  const [receiverOption, setReceiverOption] = useState<User[]>([]);
  const [receivers, setReceivers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const { user } = useUserStore();

  const fetchRecivers = async () => {
    setLoading(true);
    try {
      const { data, status } = await API.getReceivers();

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

  const sendMessageHandler = () => {
    if (user) {
      const conversation: SendMessage = {
        sender: user,
        receivers,
        content: 'Si ujang oaekoawekaowek',
      };
      API.socket.emit(MESSAGE['send-message'], conversation);
    }
    setReceivers([]);
  };

  useEffect(() => {
    fetchRecivers();
  }, []);

  useEffect(() => {
    function handleMessage(message: any): void {
      console.log(message);
    }

    API.socket.on(MESSAGE['send-message'], handleMessage);

    return () => {
      API.socket.off(MESSAGE['send-message'], handleMessage);
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
            clickHandler={selectReciverHandler}
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
        <Input className='bg-transparent text-white' />
        <Button disabled={!receivers.length} onClick={sendMessageHandler}>
          send
        </Button>
      </div>
    </div>
  );
}
