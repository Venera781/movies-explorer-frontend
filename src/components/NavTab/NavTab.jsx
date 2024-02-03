import css from './NavTab.module.css';

const NavTab = () => {
  return (
    <nav className={css.navtab}>
      <a href="#aboutproject" className={css.navtab__item}>
        О проекте
      </a>
      <a href="#techs" className={css.navtab__item}>
        Технологии
      </a>
      <a href="#aboutme" className={css.navtab__item}>
        Студент
      </a>
    </nav>
  );
};
export default NavTab;
