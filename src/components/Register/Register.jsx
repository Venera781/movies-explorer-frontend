import css from './Register.module.css';
import cx from '../../utils/cx';
import { Link } from 'react-router-dom';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const Register = () => {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({ resolver: yupResolver(schema) });

  const onRegister = ({ name, email, password }) => {
    console.log(`Имя:${name}, Email:${email}, Пароль:${password}`);
  };

  return (
    <form
      className={css.registerform}
      name="registerform"
      onSubmit={handleSubmit(onRegister)}
    >
      <Link to="/" className={css.registerform__logo} aria-label="лого"></Link>
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
        <label htmlFor={passwordId} className={css.registerform__labelpassword}>
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
        <p
          className={cx(
            css.registerform__error,
            !isValid && isSubmitted && css.registerform__error_visible,
          )}
        >
          Что-то пошло не так...
        </p>
      </fieldset>
      <button className={css.registerform__buttonedit} disabled={isSubmitting}>
        Зарегистрироваться
      </button>
      <div className={css.registerform__wrapper}>
        <p className={css.registerform__textbtn}>Уже зарегистрированы?</p>
        <Link to="/signin" className={css.registerform__buttonlogin}>
          Войти
        </Link>
      </div>
    </form>
  );
};
export default Register;
