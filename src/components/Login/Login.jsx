import css from './Login.module.css';
import cx from '../../utils/cx';
import { useId } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const emaiId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({ resolver: yupResolver(schema) });

  const onLogin = ({ email, password }) => {
    console.log(`Email:${email}, Пароль:${password}`);
  };

  return (
    <main>
      <form
        className={css.loginform}
        name="loginform"
        onSubmit={handleSubmit(onLogin)}
      >
        <Link to="/" className={css.loginform__logo}></Link>
        <h1 className={css.loginform__title}>Рады видеть!</h1>
        <fieldset className={css.loginform__inputs}>
          <label htmlFor={emaiId} className={css.loginform__labelemail}>
            Email
          </label>
          <input
            id={emaiId}
            className={cx(
              css.loginform__inputemail,
              errors.email && css.loginform__input_error,
            )}
            placeholder="Email"
            {...register('email')}
          />
          <label htmlFor={passwordId} className={css.loginform__labelpassword}>
            Пароль
          </label>
          <input
            id={passwordId}
            placeholder="Пароль"
            type="password"
            className={cx(
              css.loginform__inputpassword,
              errors.password && css.loginform__input_error,
            )}
            {...register('password')}
          />
          <p
            className={cx(
              css.loginform__error,
              !isValid && isSubmitted && css.loginform__error_visible,
            )}
          >
            Что-то пошло не так...
          </p>
        </fieldset>
        <button className={css.loginform__buttonedit} disabled={isSubmitting}>
          Войти
        </button>
        <div className={css.loginform__wrapper}>
          <p className={css.loginform__textbtn}>Ещё не зарегистрированы?</p>
          <Link to="/signup" className={css.loginform__buttonlogiin}>
            Регистрация
          </Link>
        </div>
      </form>
    </main>
  );
};
export default Login;
