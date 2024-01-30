import css from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import BurgerButton from '../BurgerButton/BurgerButton';
import { Link } from 'react-router-dom';
import cx from '../../utils/cx';

const Header = () => {
  const isAuthorized = false;
  let el;

  if (isAuthorized) {
    el = (
      <>
        <Navigation className={css.header__navigation} />
        <Link to="/profile" className={cx(css.header__profilebutton, 'button')}>
          Аккаунт
        </Link>
        <BurgerButton className={css.header__burgerbutton} />
      </>
    );
  } else {
    el = (
      <div className={css.header__wrapper}>
        <Link to="/signup" className={cx(css.header__register, 'button__link')}>
          Регистрация
        </Link>
        <Link to="/signin" className={cx(css.header__login, 'button__link')}>
          Войти
        </Link>
      </div>
    );
  }

  return (
    <header className={css.header}>
      <Link to="/" className={cx(css.header__logo, 'button')}></Link>
      {el}
    </header>
  );
};
export default Header;
