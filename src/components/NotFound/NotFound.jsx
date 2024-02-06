import { useNavigate } from 'react-router-dom';
import css from './NotFound.module.css';

const Error = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <main className={css.notfound}>
      <p className={css.notfound__name}>404</p>
      <p className={css.notfound__description}>Страница не найдена</p>
      <button className={css.notfound__buttonback} onClick={goBack}>
        Назад
      </button>
    </main>
  );
};
export default Error;
