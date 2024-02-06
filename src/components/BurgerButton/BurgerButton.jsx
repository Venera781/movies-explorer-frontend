import css from './BurgerButton.module.css';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import cx from '../../utils/cx';

const BurgerButton = ({ className }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpened(false);
  };
  return (
    <>
      <button
        className={cx(
          css.burgerbutton,
          css.burgerbutton__active,
          className
        )}
        type="button"
        onClick={toggleMenu}
      />
      {menuOpened &&
        createPortal(<MobileMenu onClose={closeMenu} />, document.body)}
    </>
  );
};
export default BurgerButton;
