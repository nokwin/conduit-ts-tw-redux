import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

interface PrivateRouteProps {}

export const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = ({
  children,
}) => {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};
