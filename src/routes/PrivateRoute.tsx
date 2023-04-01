import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/hooks';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { user } = useAuth();
  console.log(user);
  return user ? <>{children}</> : <Navigate to='/login' replace={true} />;
}
