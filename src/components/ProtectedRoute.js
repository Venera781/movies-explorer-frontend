import React from 'react';
import { Navigate } from 'react-router-dom';
import StateUser from '../utils/StateUser';
import { useUserState } from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ children, reverse }) => {
  const userState = useUserState();

  switch (userState) {
    case StateUser.idle:
      if (reverse) {
        return <>{children}</>;
      }
    case StateUser.checking:
      return <p>Загрузка...</p>;
    case StateUser.loggedIn:
      if (!reverse) {
        return <>{children}</>;
      }
    case StateUser.error:
    default:
      return <Navigate to="/" replace />;
  }
};
export default ProtectedRoute;
