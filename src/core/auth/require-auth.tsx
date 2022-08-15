import { Navigate } from 'react-router-dom';

import { useAuth } from './auth';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  console.log('auth', auth);

  if (!auth.isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  return children;
};
