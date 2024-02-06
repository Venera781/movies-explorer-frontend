import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <a
        className={css.footer__link}
        target="_blank"
        href="https://github.com/Venera781/movies-explorer-frontend" rel="noreferrer"
      >
        Учебный проект Яндекс.Практикум х BeatFilm.
      </a>
      <div className={css.footer__line}></div>
      <div className={css.footer__wrapper}>
        <a
          className={css.footer__linkyandex}
          target="_blank"
          href="https://practicum.yandex.ru/" rel="noreferrer"
        >
          Яндекс.Практикум
        </a>
        <a
          className={css.footer__linkgithub}
          target="_blank"
          href="https://github.com/Venera781/" rel="noreferrer"
        >
          Github
        </a>
        <p className={css.footer__copyright}>© 2020</p>
      </div>
    </footer>
  );
};
export default Footer;
