import { Link } from 'react-router-dom';
import Button from 'src/components/Button';

export default function ConversationPage() {
  return (
    <div className='w-full h-full flex justify-center items-center gap-4'>
      <Link to='/conversations/broadcast'>New Broadcast Message</Link>
      <div className='w-px h-24 bg-gradient-to-b from-darkest via-dark to-darkest'></div>
      <Link to='/conversations/create-group'>Create Group Message</Link>
    </div>
  );
}
