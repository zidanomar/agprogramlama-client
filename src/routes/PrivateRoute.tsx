import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/hooks';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element {
  const { data, isLoading, error } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (error || !data) {
    localStorage.removeItem('access_token');
    return <Navigate to='/login' />;
  }

  return children;
}
