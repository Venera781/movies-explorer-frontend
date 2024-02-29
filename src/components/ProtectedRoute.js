import React from 'react';
import { Navigate } from 'react-router-dom';
import PathName from '../utils/PathName';
import StateUser from '../utils/StateUser';
import { useUserState } from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ children }) => {
  const userState = useUserState();

  switch (userState) {
    case StateUser.idle:
    case StateUser.checking:
      return <p>Загрузка...</p>;
    case StateUser.loggedIn:
      return <>{children}</>;
    case StateUser.error:
    default:
      return <Navigate to={PathName.login} replace />;
  }
};
export default ProtectedRoute;
