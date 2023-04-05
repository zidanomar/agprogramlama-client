import React, { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import Dropdown from 'src/components/Dropdown';
import Input from 'src/components/Input';

import * as API from 'src/api';
import { User } from 'src/types';

export default function ConversationPage() {
  const [receiverOption, setReceiverOption] = useState<User[]>([]);
  const [receiver, setReceivers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

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
    console.log(receiver);
    setReceivers([]);
  };

  useEffect(() => {
    fetchRecivers();
  }, []);

  return (
    <div className='flex flex-col relative gap-8 h-full w-full'>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <Dropdown
            placeholder='Select reciver'
            values={receiverOption.map((receiver) => ({
              value: JSON.stringify(receiver),
              label: `${receiver.firstName} ${receiver.lastName}`,
            }))}
            clickHandler={selectReciverHandler}
          />
        </div>
      )}

      <p>send to:</p>

      {receiver.length > 0 && (
        <div className='flex flex-col gap-4'>
          {receiver.map((receiver) => (
            <p key={receiver.id}>
              {receiver.firstName} {receiver.lastName}
            </p>
          ))}
        </div>
      )}

      <div className='w-full flex absolute bottom-0 gap-8'>
        <Input className='bg-transparent text-white' />
        <Button disabled={!receiver.length} onClick={sendMessageHandler}>
          send
        </Button>
      </div>
    </div>
  );
}
