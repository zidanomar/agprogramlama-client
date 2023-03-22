import { Outlet } from 'react-router-dom';
import SideMenu from 'src/pages/Message/components/SideMenu';

export default function MainLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
