import { ConversationType, User } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { conversationAPI, userAPI } from 'src/api';
import Button from 'src/components/Button';
import Dropdown from 'src/components/Dropdown';
import Input from 'src/components/Input';
import Label from 'src/components/Label';
import { useDisclosure } from 'src/hooks';
import { useConversationStore, useUserStore } from 'src/store';
import { ConversationWithUsers } from 'src/types';

export default function CreateGroupPage() {
  const [receivers, setReceivers] = useState<User[]>([]);
  const [receiverOption, setReceiverOption] = useState<User[]>([]);
  const [groupName, setGroupName] = useState('');

  const [loading, onLoading, onLoaded] = useDisclosure();
  const { user } = useUserStore();
  const { conversations, setConversations } = useConversationStore();

  const fetchRecivers = async () => {
    onLoading();
    try {
      const { data, status } = await userAPI.getReceivers();

      if (status === 200) {
        setReceiverOption(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      onLoaded();
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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!user) return;
      console.log(user, receivers);
      const { data } = await conversationAPI.createGroupConversation({
        name: groupName,
        receivers: receivers,
        sender: user,
        type: 'GROUP',
      });

      const newConversation = [data, ...conversations];
      setConversations(newConversation);
    } catch (error) {
      console.error(error);
    } finally {
      setGroupName('');
      setReceivers([]);
    }
  };
  useEffect(() => {
    fetchRecivers();
  }, []);

  return (
    <div className='w-full h-full flex flex-col gap-8 justify-center items-center'>
      <h3>Create New Group</h3>
      <form onSubmit={submitHandler} className='w-96 flex flex-col gap-4'>
        {/* Group Name */}
        <div className='mb-4'>
          <Label label='Group Name' htmlFor='groupName' />
          <Input
            id='groupName'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        {/* Group Participant */}
        <div className='mb-6'>
          <Label
            label={`Group Participant : ${receivers.length}`}
            htmlFor='groupParticipant'
          />
          {loading ? (
            <p>loading</p>
          ) : (
            <Dropdown
              values={receiverOption.map((r) => ({
                value: JSON.stringify(r),
                label: `${r.firstName} ${r.lastName}`,
              }))}
              className='w-full'
              onChange={selectReciverHandler}
            />
          )}
        </div>
        {/* Create New Group Button */}
        <Button
          className='self-end'
          disabled={!groupName.length || !receivers.length}
          type='submit'
        >
          Create New Group
        </Button>
      </form>
    </div>
  );
}
