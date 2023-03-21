import { useQuery } from '@tanstack/react-query';

import { Navigate } from 'react-router-dom';

import * as API from 'src/api';

export default function MessagePage() {
  const { error } = useQuery({
    queryKey: ['user/auth'],
    queryFn: API.getUserAuth,
  });

  if (error) return <Navigate to='/login' />;

  return <div>MessagePage</div>;
}
