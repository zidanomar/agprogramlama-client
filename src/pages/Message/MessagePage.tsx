import SideMenu from './components/SideMenu';
import * as API from 'src/api';
import { useAuth } from 'src/hooks';
import Message from './components/Message';

const socket = API.socket;

export default function MessagePage() {
  const { user } = useAuth();

  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/5 h-screen max-h-screen bg-dark overflow-y-auto p-8'>
        <SideMenu />
      </div>
      <div className='w-4/5 h-screen max-h-screen bg-darkest overflow-y-auto p-8'>
        <Message />
      </div>
    </div>
  );
}
