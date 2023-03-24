import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import InputGroup from 'src/components/InputGroup';
import Label from 'src/components/Label';

import * as API from 'src/api';

export default function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading, error } = useMutation(API.login, {
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      navigate('/');
    },
    onError: (error) => {
      // @ts-ignore
      console.log(error.response.data);
    },
  });

  const onLoginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    mutate({ email, password });
  };

  if (isLoading) return <div>Loading...</div>;

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
