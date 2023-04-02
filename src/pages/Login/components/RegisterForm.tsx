import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import InputGroup from 'src/components/InputGroup';
import Label from 'src/components/Label';

import * as API from 'src/api';
import { useAuth } from 'src/hooks';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const imageUriRef = useRef<HTMLInputElement>(null);

  const onRegisterHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const imageUri = imageUriRef.current?.value;

    if (!email || !password || !firstName || !lastName) return;

    try {
      const { access_token } = await API.register({
        email,
        password,
        firstName,
        lastName,
        imageUri,
      });

      localStorage.setItem('access_token', access_token);
      setUser(user);
      navigate('/');
    } catch (error) {
      navigate('/login');
      setUser(null);
    }
  };

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
