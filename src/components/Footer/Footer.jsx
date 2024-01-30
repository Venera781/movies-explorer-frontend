import css from './Footer.module.css';
import { Link } from 'react-router-dom';
import cx from '../../utils/cx';

const Footer = () => {
  return (
    <section className={css.footer}>
      <Link
        className={cx(css.footer__link, 'button__link')}
        target="_blank"
        to="https://github.com/Venera781/movies-explorer-frontend"
      >
        Учебный проект Яндекс.Практикум х BeatFilm.
      </Link>
      <div className={css.footer__line}></div>
      <div className={css.footer__wrapper}>
        <Link
          className={cx(css.footer__linkyandex, 'button__link')}
          target="_blank"
          to="https://practicum.yandex.ru/"
        >
          Яндекс.Практикум
        </Link>
        <Link
          className={cx(css.footer__linkgithub, 'button__link')}
          target="_blank"
          to="https://github.com/Venera781/"
        >
          Github
        </Link>
        <p className={css.footer__copyright}>© 2020</p>
      </div>
    </section>
  );
};
export default Footer;
