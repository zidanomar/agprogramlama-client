import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { userAPI } from 'src/api';
import { useUserStore } from 'src/store';
export default function MainLayout() {
  const { setUser, clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getUser = async () => {
    setIsLoading(true);
    try {
      const user = await userAPI.getCurrentUser();

      setUser(user);
      setIsLoading(false);
    } catch (error) {
      clearUser();
      setIsLoading(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return <main>{isLoading ? <div>Loading...</div> : <Outlet />}</main>;
}
