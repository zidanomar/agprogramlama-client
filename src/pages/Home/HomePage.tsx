import { Link } from 'react-router-dom';
import { useAuth } from 'src/hooks';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className='flex flex-col gap-8 h-screen w-full justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-3 w-400 p-8 rounded-md bg-dark'>
        <div>avatar</div>
        <h3>
          {user?.firstName} {user?.lastName}
        </h3>
        <p>0 new message</p>
      </div>
      <Link to='/conversations'>Go to conversation</Link>
    </div>
  );
}
