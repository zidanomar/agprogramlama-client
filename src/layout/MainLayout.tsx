import { Outlet } from 'react-router-dom';
import SideMenu from 'src/components/ui/SideMenu';

export default function MainLayout() {
  return (
    <main className='w-full flex'>
      <div className='w-1/5 h-screen max-h-screen bg-dark overflow-y-auto'>
        <SideMenu />
      </div>
      <div className='w-4/5 h-screen max-h-screen bg-darkest overflow-y-auto'>
        <Outlet />
      </div>
    </main>
  );
}
