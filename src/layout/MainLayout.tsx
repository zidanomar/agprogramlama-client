import { useEffect, useState } from 'react';
import * as API from 'src/api';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from 'src/store';
export default function MainLayout() {
  const { setUser, clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getUser = async () => {
    setIsLoading(true);
    try {
      const user = await API.getCurrentUser();

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
