import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { Loading } from '@/ui-components/loading';

import { auth } from '../firebase';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [user, authLoading] = useAuthState(auth);

  if (authLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate replace to='/' />;
  }

  return children;
};
