import React, { FC } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/AuthContextProvider';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

type TProps = {
  children?: React.ReactNode;
} & RouteProps;

const PrivateRoute: FC<TProps> = ({ children }) => {
  const { isAuthenticate } = useAuthContext();
  if (isAuthenticate === null) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{isAuthenticate ? children : <Navigate to="/login" state={{ from: location.pathname }} replace={true} />}</>;
};

export default PrivateRoute;
