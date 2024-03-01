import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import StateUser from '../utils/StateUser';
import mainapi from '../utils/MainApi';

const CurrentUserContext = createContext(null);
const UserEditContext = createContext(null);

export const useUserName = () => {
  return useContext(CurrentUserContext).data?.name;
};
export const useUserEmail = () => {
  return useContext(CurrentUserContext).data?.email;
};

export const useUserState = () => {
  return useContext(CurrentUserContext).state;
};

export const useClearUser = () => {
  return useContext(UserEditContext).clearUser;
};
export const useSetCurrentUser = () => {
  return useContext(UserEditContext).setCurrentUser;
};
const INIT_STATE = { state: StateUser.idle, data: null };

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(INIT_STATE);
  const { pathname } = useLocation();
  const userState = user.state;

  useEffect(() => {
    if (userState === StateUser.loggedIn || userState === StateUser.error) {
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

  const clearUser = useCallback(() => {
    setUser(INIT_STATE);
  }, []);

  const setCurrentUser = useCallback((userInfo) => {
    setUser({ state: StateUser.loggedIn, data: userInfo });
  }, []);

  const userEdit = useMemo(
    () => ({ clearUser, setCurrentUser }),
    [clearUser, setCurrentUser],
  );
  return (
    <UserEditContext.Provider value={userEdit}>
      <CurrentUserContext.Provider value={user}>
        {children}
      </CurrentUserContext.Provider>
    </UserEditContext.Provider>
  );
};

export default CurrentUserProvider;
