import { Link, useNavigate } from 'react-router-dom';
import css from './NotFound.module.css';
import cx from '../../utils/cx';

const Error = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className={css.notfound}>
      <div className={css.notfound__wrapper}>
        <p className={css.notfound__name}>404</p>
        <p className={css.notfound__description}>Страница не найдена</p>
      </div>
      <Link
        to="#"
        className={cx(css.notfound__buttonback, 'button__link')}
        onBack={goBack}
      >
        Назад
      </Link>
    </div>
  );
};
export default Error;
