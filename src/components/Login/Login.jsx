import css from './Login.module.css';
import { useId } from 'react';
import { Link } from 'react-router-dom';
import cx from '../../utils/cx';

const Login = () => {
  const emaiId = useId();
  const passwordId = useId();

  return (
    <form className={css.loginform} name="loginform" action="#">
      <Link to="/" className={cx(css.loginform__logo, 'button')}></Link>
      <h1 className={css.loginform__title}>Рады видеть!</h1>
      <fieldset className={css.loginform__inputs}>
        <label htmlFor={emaiId} className={css.loginform__labelemail}>
          Email
        </label>
        <input
          id={emaiId}
          className={css.loginform__inputemail}
          placeholder="Email"
          value=""
          required
        />
        <label htmlFor={passwordId} className={css.loginform__labelpassword}>
          Пароль
        </label>
        <input
          id={passwordId}
          className={css.loginform__inputpassword}
          placeholder="Пароль"
          value=""
          required
        />
        <span className={css.loginform__error}>Что-то пошло не так...</span>
      </fieldset>
      <button className={cx(css.loginform__buttonedit, 'button')}>Войти</button>
      <Link
        to="/signup"
        className={cx(css.loginform__buttonlogiin, 'button__link')}
      >
        <span className={css.loginform__textbtn}>
          Ещё не зарегистрированы?{' '}
        </span>{' '}
        Регистрация
      </Link>
    </form>
  );
};
export default Login;
