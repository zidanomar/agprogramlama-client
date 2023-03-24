import SideMenu from './components/SideMenu';

export default function MessagePage() {
  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/5 h-screen max-h-screen bg-dark overflow-y-auto'>
        <SideMenu />
      </div>
      <div className='w-4/5 h-screen max-h-screen bg-darkest overflow-y-auto'>
        <div>message</div>
      </div>
    </div>
  );
}
