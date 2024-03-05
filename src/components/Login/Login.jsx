import css from './Login.module.css';
import cx from '../../utils/cx';
import { useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import mainapi from '../../utils/MainApi';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import emailRegex from '../../utils/emailRegex';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .matches(
        emailRegex,
        'Неверно введен email. Необходимо ввести в формате example@mail.com',
      )
      .required('Введите email'),
    password: yup
      .string()
      .min(8, 'Пароль должен быть длиннее 8 символов')
      .required('Пароль должен быть длиннее 8 символов'),
  })
  .required();

const Login = () => {
  const emaiId = useId();
  const passwordId = useId();
  const setCurrentUser = useSetCurrentUser();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
    setError,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onLogin = async (data) => {
    try {
      const userData = await mainapi.authorize(data);
      reset();
      setCurrentUser(userData);
      navigate('/movies');
    } catch (err) {
      setError('root', { type: 'custom', message: err.message });
    }
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
          <span className={css.loginform__error_email}>
            {errors.email?.message}
          </span>
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
          <span className={css.loginform__error_password}>
            {errors.password?.message}
          </span>
          <p
            className={cx(
              css.loginform__error,
              !isValid && isSubmitted && css.loginform__error_visible,
            )}
          >
            Что-то пошло не так...
          </p>
        </fieldset>
        <button
          className={css.loginform__buttonedit}
          disabled={!isValid || (isSubmitted && isSubmitting)}
        >
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
