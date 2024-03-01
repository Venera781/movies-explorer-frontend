import React from 'react';
import { Navigate } from 'react-router-dom';
import StateUser from '../utils/StateUser';
import { useUserState } from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ children, reverse }) => {
  const userState = useUserState();
  if (
    reverse ? userState === StateUser.idle : userState === StateUser.loggedIn
  ) {
    return <>{children}</>;
  }
  if (userState === StateUser.checking) {
    return <p>Загрузка</p>;
  }
  return <Navigate to="/" replace />;
};
export default ProtectedRoute;
