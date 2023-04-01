import { useEffect, useState } from 'react';
import * as API from 'src/api';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks';
export default function MainLayout() {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return <main>{isLoading ? <div>Loading...</div> : <Outlet />}</main>;
}
