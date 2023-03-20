import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='bg-dark p-8 rounded-md'>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <p
          className='mt-8 underline text-sm text-center hover:text-purple-400 hover:cursor-pointer'
          onClick={() => setIsLogin((isLogin) => !isLogin)}
        >
          {isLogin ? 'Create an account' : 'Already have an account?'}
        </p>
      </div>
    </div>
  );
}
