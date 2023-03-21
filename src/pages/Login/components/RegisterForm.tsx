import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import InputGroup from 'src/components/InputGroup';
import Label from 'src/components/Label';

import * as API from 'src/api';

export default function RegisterForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const imageUriRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading, error } = useMutation(API.register, {
    onSuccess: (data) => {
      // emailRef.current!.value = '';
      // passwordRef.current!.value = '';
      // firstNameRef.current!.value = '';
      // lastNameRef.current!.value = '';
      // imageUriRef.current!.value = '';

      localStorage.setItem('access_token', data.access_token);
      navigate('/message');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onRegisterHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const imageUri = imageUriRef.current?.value;

    if (!email || !password || !firstName || !lastName) return;

    mutate({ email, password, firstName, lastName, imageUri });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={onRegisterHandler}>
      <InputGroup>
        <Label htmlFor='email' label='Email' />
        <Input id='email' placeholder='Email' ref={emailRef} />
      </InputGroup>

      <div className='flex flex-row gap-4'>
        <InputGroup>
          <Label htmlFor='firstName' label='First Name' />
          <Input id='firstName' placeholder='First Name' ref={firstNameRef} />
        </InputGroup>

        <InputGroup>
          <Label htmlFor='lastName' label='Last Name' />
          <Input id='lastName' placeholder='Last Name' ref={lastNameRef} />
        </InputGroup>
      </div>

      <InputGroup>
        <Label htmlFor='imageUri' label='Profile Image URI' />
        <Input
          id='imageUri'
          placeholder='Profile Image URI'
          ref={imageUriRef}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor='password' label='Password' />
        <Input
          id='password'
          type='password'
          placeholder='******************'
          ref={passwordRef}
        />
      </InputGroup>
      <div className='flex'>
        <Button type='submit' className='ml-auto text-sm'>
          Register
        </Button>
      </div>
    </form>
  );
}
