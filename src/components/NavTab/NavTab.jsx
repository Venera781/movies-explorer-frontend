import { NavLink } from "react-router-dom";
import css from "./NavTab.module.css";

const NavTab =()=>{
return(<nav className={css.navtab}>
  <NavLink to = "#" className={css.navtab__item}>О проекте</NavLink>
  <NavLink to = "#" className={css.navtab__item}>Технологии</NavLink>
  <NavLink to = "#" className={css.navtab__item}>Студент</NavLink>
</nav>)
};
export default NavTab;