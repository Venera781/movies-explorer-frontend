import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StateUser from '../utils/StateUser';
import mainapi from '../utils/MainApi';
import PathName from '../utils/PathName';

const CurrentUserContext = createContext(null);

export const useUserName = () => {
  return useContext(CurrentUserContext).data?.name;
};
export const useUserEmail = () => {
  return useContext(CurrentUserContext).data?.email;
};

export const useUserState = () => {
  return useContext(CurrentUserContext).state;
};

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState({ state: StateUser.idle, data: null });
  const { pathname } = useLocation();
  const userState = user.state;

  useEffect(() => {
    if (userState === StateUser.loggedIn) {
      return;
    }
    if (pathname === PathName.register || pathname === PathName.login) {
      setUser({ state: StateUser.idle, data: null });
      return;
    }
    const getUserFn = async () => {
      setUser({ state: StateUser.checking, data: null });
      try {
        const userInfo = await mainapi.getInfoUser();
        setUser({ state: StateUser.loggedIn, data: userInfo });
      } catch (err) {
        setUser({ state: StateUser.error, data: null });
      }
    };
    getUserFn();
  }, [pathname, userState]);

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
