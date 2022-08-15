import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { auth } from '../firebase';
import { SplashScreen } from '../splash-screen';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [user, authLoading] = useAuthState(auth);

  if (authLoading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <Navigate replace to='/' />;
  }

  return children;
};
