import { Link } from 'react-router-dom';
import css from './Portfolio.module.css';

const Portfolio = () => {
  return (
    <section className={css.portfolio}>
      <h2 className={css.portfolio__h2subtitle}>Портфолио</h2>
      <div className={css.portfolio__sites}>
        <Link
          className={css.portfolio__link}
          target="_blank"
          to="https://github.com/Venera781/how-to-learn"
        >
          Статичный сайт
        </Link>
        <div className={css.portfolio__line}></div>
        <Link
          className={css.portfolio__link}
          target="_blank"
          to="https://venera781.github.io/russian-travel/"
        >
          Адаптивный сайт
        </Link>
        <div className={css.portfolio__line}></div>
        <Link
          className={css.portfolio__link}
          target="_blank"
          to="https://github.com/Venera781/react-mesto-api-full-gha"
        >
          Одностраничное приложение
        </Link>
      </div>
    </section>
  );
};
export default Portfolio;
