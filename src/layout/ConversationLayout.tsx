import { Outlet } from 'react-router-dom';
import SideMenu from 'src/components/SideMenu';

export default function ConversationLayout() {
  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/5 h-screen max-h-screen bg-dark overflow-y-auto p-8'>
        <SideMenu />
      </div>
      <div className='w-4/5 h-screen max-h-screen bg-darkest overflow-y-auto p-8'>
        <Outlet />
      </div>
    </div>
  );
}
