import React, { useState } from 'react';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import Dropdown from 'src/components/Dropdown';
import Input from 'src/components/Input';

export default function ConversationPage() {
  const [recivers, setRecivers] = useState<string[]>([]);
  return (
    <div className='flex flex-col relative gap-8 h-full w-full'>
      <div>
        <Dropdown
          placeholder='Select reciver'
          values={[
            {
              option: 'option 1',
              value: 'option 1',
            },
          ]}
          clickHandler={(e) => {
            const { value } = e.target;
            console.log(value);
          }}
        />
      </div>

      <div className='w-full flex absolute bottom-0 gap-8'>
        <div className='w-full'>
          <Input className='bg-transparent text-white' />
        </div>
        <Button disabled={!recivers.length}>send</Button>
      </div>
    </div>
  );
}
