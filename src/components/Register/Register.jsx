import css from './Register.module.css';
import { Link } from 'react-router-dom';
import cx from '../../utils/cx'; 
import { useId } from 'react';

const Register = () => {
  const nameId = useId();
  const emaiId = useId();
  const passwordId = useId();

  return (
    <form className={css.registerform} name="registerform" action="#">
      <Link to="/" className={cx(css.registerform__logo, 'button')}></Link>
      <h1 className={css.registerform__title}>Добро пожаловать!</h1>
      <fieldset className={css.registerform__inputs}>
        <label className={css.registerform__labelname} htmlFor={nameId}>
          Имя
        </label>
        <input
          id={nameId}
          className={css.registerform__inputname}
          placeholder="Имя"
          value=""
          required
        />
        <label htmlFor={emaiId} className={css.registerform__labelemail}>
          Email
        </label>
        <input
          id={emaiId}
          className={css.registerform__inputemail}
          placeholder="Email"
          value=""
          required
        />
        <label htmlFor={passwordId} className={css.registerform__labelpassword}>
          Пароль
        </label>
        <input
          id={passwordId}
          className={css.registerform__inputpassword}
          placeholder="Пароль"
          value=""
          required
        />
        <span className={css.registerform__error}>Что-то пошло не так...</span>
      </fieldset>
      <button className={css.registerform__buttonedit}>Зарегистрироваться</button>
      <Link
        to="/signin"
        className={cx(css.registerform__buttonlogin, 'button__link')}
      >
        <span className={css.registerform__textbtn}>
          Уже зарегистрированы?{' '}
        </span>
        Войти
      </Link>
    </form>
  );
};
export default Register;
