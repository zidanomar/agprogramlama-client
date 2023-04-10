import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import InputGroup from 'src/components/InputGroup';
import Label from 'src/components/Label';

import * as API from 'src/api';
import { useUserStore } from 'src/store';

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser, clearUser } = useUserStore();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onLoginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    try {
      const { access_token, user } = await API.login({ email, password });

      localStorage.setItem('access_token', access_token);

      setUser(user);
      API.socket.connect();
      navigate('/');
    } catch (error) {
      navigate('/login');
      clearUser();
      API.socket.disconnect();
    }
  };

  return (
    <form onSubmit={onLoginHandler}>
      <InputGroup>
        <Label htmlFor='email' label='Email' />
        <Input id='email' placeholder='Email' ref={emailRef} />
      </InputGroup>

      <InputGroup>
        <Label htmlFor='password' label='Password' />
        <Input
          id='password'
          type='password'
          ref={passwordRef}
          placeholder='******************'
        />
      </InputGroup>
      <div className='flex'>
        <Button type='submit' className='ml-auto text-sm'>
          Login
        </Button>
      </div>
    </form>
  );
}
