import { User } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { userAPI } from 'src/api';
import Button from 'src/components/Button';
import Dropdown from 'src/components/Dropdown';
import Input from 'src/components/Input';
import Label from 'src/components/Label';
import { useDisclosure } from 'src/hooks';

export default function CreateGroupPage() {
  const [receivers, setReceivers] = useState<User[]>([]);
  const [receiverOption, setReceiverOption] = useState<User[]>([]);
  const [loading, onLoading, onLoaded] = useDisclosure();

  const [groupName, setGroupName] = useState('');

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(groupName, receivers);
    setGroupName('');
    setReceivers([]);
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
        >
          Create New Group
        </Button>
      </form>
    </div>
  );
}
