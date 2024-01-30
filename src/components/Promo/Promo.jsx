import NavTab from '../NavTab/NavTab';
import css from './Promo.module.css';

const Promo = () => {
  return (
    <div className={css.promo}>
      <h1 className={css.promo__title}>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab />
    </div>
  );
};
export default Promo;
