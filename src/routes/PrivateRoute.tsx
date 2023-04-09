import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from 'src/store';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { user } = useUserStore();
  return user ? <>{children}</> : <Navigate to='/login' replace={true} />;
}
