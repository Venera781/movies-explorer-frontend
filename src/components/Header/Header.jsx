import css from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import BurgerButton from '../BurgerButton/BurgerButton';
import { Link } from 'react-router-dom';
import { useUserState } from '../../contexts/CurrentUserContext';
import StateUser from '../../utils/StateUser';

const Header = () => {
  const userState = useUserState();
  let el;

  if (userState === StateUser.loggedIn) {
    el = (
      <>
        <Navigation className={css.header__navigation} />
        <Link to="/profile" className={css.header__profilebutton}>
          Аккаунт
        </Link>
        <BurgerButton className={css.header__burgerbutton} />
      </>
    );
  } else {
    el = (
      <div className={css.header__wrapper}>
        <Link to="/signup" className={css.header__register}>
          Регистрация
        </Link>
        <Link to="/signin" className={css.header__login}>
          Войти
        </Link>
      </div>
    );
  }

  return (
    <header className={css.header}>
      <Link to="/" className={css.header__logo}></Link>
      {el}
    </header>
  );
};
export default Header;
