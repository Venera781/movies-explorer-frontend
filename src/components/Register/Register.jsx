import css from './Register.module.css';
import cx from '../../utils/cx';
import { Link, useNavigate } from 'react-router-dom';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import mainapi from '../../utils/MainApi';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import emailRegex from '../../utils/emailRegex';

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .min(2, 'Необходимо минимум 2 символа')
      .max(20, 'Возможно максимум 20 символов')
      .matches(/^[а-яёa-z]+$/i, 'Необходима кириллица или латиница')
      .required('Введите имя'),
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

const Register = () => {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const setCurrentUser = useSetCurrentUser();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const navigate = useNavigate();

  const onRegister = async (data) => {
    try {
      const userData = await mainapi.register(data);
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
        className={css.registerform}
        name="registerform"
        onSubmit={handleSubmit(onRegister)}
      >
        <Link
          to="/"
          className={css.registerform__logo}
          aria-label="лого"
        ></Link>
        <h1 className={css.registerform__title}>Добро пожаловать!</h1>
        <fieldset className={css.registerform__inputs}>
          <label className={css.registerform__labelname} htmlFor={nameId}>
            Имя
          </label>
          <input
            id={nameId}
            className={cx(
              css.registerform__inputname,
              errors.name && css.registerform__input_error,
            )}
            placeholder="Имя"
            {...register('name')}
          />
          <span className={css.registerform__error_name}>
            {errors.name?.message}
          </span>
          <label htmlFor={emailId} className={css.registerform__labelemail}>
            Email
          </label>
          <input
            id={emailId}
            className={cx(
              css.registerform__inputemail,
              errors.email && css.registerform__input_error,
            )}
            placeholder="Email"
            {...register('email')}
          />
          <span className={css.registerform__error_email}>
            {errors.email?.message}
          </span>
          <label
            htmlFor={passwordId}
            className={css.registerform__labelpassword}
          >
            Пароль
          </label>
          <input
            id={passwordId}
            type="password"
            className={cx(
              css.registerform__inputpassword,
              errors.password && css.registerform__input_error,
            )}
            placeholder="Пароль"
            {...register('password')}
          />
          <span className={css.registerform__error_password}>
            {errors.password?.message}
          </span>
          <span
            className={cx(
              css.registerform__error,
              !isValid && isSubmitted && css.registerform__error_visible,
            )}
          >
            Что-то пошло не так...
          </span>
        </fieldset>
        <button
          className={css.registerform__buttonedit}
          disabled={!isValid || (isSubmitted && isSubmitting)}
        >
          Зарегистрироваться
        </button>
        <div className={css.registerform__wrapper}>
          <p className={css.registerform__textbtn}>Уже зарегистрированы?</p>
          <Link to="/signin" className={css.registerform__buttonlogin}>
            Войти
          </Link>
        </div>
      </form>
    </main>
  );
};
export default Register;
