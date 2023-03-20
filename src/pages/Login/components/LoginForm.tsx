import { useNavigate } from 'react-router-dom';

import Button from 'src/components/Button';
import Input from 'src/components/Input';
import InputGroup from 'src/components/InputGroup';
import Label from 'src/components/Label';

export default function LoginForm() {
  const navigate = useNavigate();
  const onLoginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/');
  };
  return (
    <form onSubmit={onLoginHandler}>
      <InputGroup>
        <Label htmlFor='email' label='Email' />
        <Input id='email' placeholder='Email' />
      </InputGroup>

      <InputGroup>
        <Label htmlFor='password' label='Password' />
        <Input id='password' type='password' placeholder='******************' />
      </InputGroup>
      <div className='flex'>
        <Button type='submit' className='ml-auto text-sm'>
          Login
        </Button>
      </div>
    </form>
  );
}
