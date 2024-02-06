import cx from '../../utils/cx';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
/* Навигация для desktop */

const Navigation = ({ className }) => {
  return (
    <nav className={cx(css.menu, className)}>
      <NavLink to="/movies" className={css.menu__link}>
        Фильмы
      </NavLink>
      <NavLink to="/saved-movies" className={css.menu__link}>
        Сохраненные фильмы
      </NavLink>
    </nav>
  );
};
export default Navigation;
