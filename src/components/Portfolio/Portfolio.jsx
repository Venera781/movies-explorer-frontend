import css from './Portfolio.module.css';

const Portfolio = () => {
  return (
    <section className={css.portfolio}>
      <h2 className={css.portfolio__h2subtitle}>Портфолио</h2>
      <div className={css.portfolio__sites}>
        <a
          className={css.portfolio__link}
          target="_blank"
          href="https://github.com/Venera781/how-to-learn" rel="noreferrer"
        >
          Статичный сайт
        </a>
        <div className={css.portfolio__line}></div>
        <a
          className={css.portfolio__link}
          target="_blank"
          href="https://venera781.github.io/russian-travel/" rel="noreferrer"
        >
          Адаптивный сайт
        </a>
        <div className={css.portfolio__line}></div>
        <a
          className={css.portfolio__link}
          target="_blank"
          href="https://github.com/Venera781/react-mesto-api-full-gha" rel="noreferrer"
        >
          Одностраничное приложение
        </a>
      </div>
    </section>
  );
};
export default Portfolio;
