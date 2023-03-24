import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/hooks';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated', isAuthenticated);
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to='/login' replace={true} />
  );
}
