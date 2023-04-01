import { useEffect, useState } from 'react';
import * as API from 'src/api';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks';
export default function MainLayout() {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getUser = async () => {
    setIsLoading(true);
    try {
      const user = await API.getCurrentUser();

      console.log('user', user);
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLoading(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return <main>{isLoading ? <div>Loading...</div> : <Outlet />}</main>;
}
