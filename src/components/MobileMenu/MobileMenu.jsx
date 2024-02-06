import { Link, NavLink } from 'react-router-dom';
import css from './MobileMenu.module.css';
import cx from '../../utils/cx';

const MobileMenu = ({ onClose }) => {
  return (
    <div className={css.mobilemenu}>
      <button className={css.mobilemenu__closebutton} onClick={onClose} />
      <nav className={css.mobilemenu__links}>
        <NavLink
          end
          to="/"
          className={({ isActive }) =>
            cx(css.mobilemenu__link, isActive && css.mobilemenu__link_active)
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            cx(css.mobilemenu__link, isActive && css.mobilemenu__link_active)
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            cx(css.mobilemenu__link, isActive && css.mobilemenu__link_active)
          }
        >
          Сохраненные фильмы
        </NavLink>
      </nav>
      <Link
        to="/profile"
        className={css.mobilemenu__profilebutton}
      >
        Аккаунт
      </Link>
    </div>
  );
};
export default MobileMenu;
