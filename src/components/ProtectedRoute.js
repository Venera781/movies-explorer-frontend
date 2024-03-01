import React from 'react';
import { Navigate } from 'react-router-dom';
import StateUser from '../utils/StateUser';
import { useUserState } from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ children, reverse }) => {
  const userState = useUserState();

  if (userState === StateUser.checking) {
    return <p>Загрузка</p>;
  }

  if (
    reverse
      ? userState !== StateUser.loggedIn
      : userState === StateUser.loggedIn
  ) {
    return <>{children}</>;
  }
  return <Navigate to="/" replace />;
};
export default ProtectedRoute;
