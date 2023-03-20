import { useNavigate } from 'react-router-dom';

import Button from 'src/components/Button';
import Input from 'src/components/Input';
import InputGroup from 'src/components/InputGroup';
import Label from 'src/components/Label';

export default function RegisterForm() {
  const navigate = useNavigate();
  const onRegisterHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/');
  };
  return (
    <form onSubmit={onRegisterHandler}>
      <InputGroup>
        <Label htmlFor='email' label='Email' />
        <Input id='email' placeholder='Email' />
      </InputGroup>

      <div className='flex flex-row gap-4'>
        <InputGroup>
          <Label htmlFor='firstName' label='First Name' />
          <Input id='firstName' placeholder='First Name' />
        </InputGroup>

        <InputGroup>
          <Label htmlFor='lastName' label='Last Name' />
          <Input id='lastName' placeholder='Last Name' />
        </InputGroup>
      </div>

      <InputGroup>
        <Label htmlFor='imageUri' label='Profile Image URI' />
        <Input id='imageUri' placeholder='Profile Image URI' />
      </InputGroup>

      <InputGroup>
        <Label htmlFor='password' label='Password' />
        <Input id='password' type='password' placeholder='******************' />
      </InputGroup>
      <div className='flex'>
        <Button type='submit' className='ml-auto text-sm'>
          Register
        </Button>
      </div>
    </form>
  );
}
