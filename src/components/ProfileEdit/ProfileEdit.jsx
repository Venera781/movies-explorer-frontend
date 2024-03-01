import cx from '../../utils/cx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useId } from 'react';
import * as yup from 'yup';
import css from './ProfileEdit.module.css';
import { useUserEmail, useUserName } from '../../contexts/CurrentUserContext';
import mainapi from '../../utils/MainApi';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';

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
      .email(
        'Неверно введен email. Необходимо ввести в формате example@mail.com',
      )
      .required('Введите email'),
  })
  .required();

const ProfileEdit = ({ onEditFinish }) => {
  const name = useUserName();
  const email = useUserEmail();
  const nameId = useId();
  const emailId = useId();
  const setCurrentUser = useSetCurrentUser();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting, isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name, email },
  });

  const onEdit = async ({ name, email }) => {
    try {
      const userData = await mainapi.editProfile({ name, email });
      reset();
      setCurrentUser(userData);
      onEditFinish();
    } catch (err) {
      setError('root', { type: 'custom', message: err.message });
    }
  };

  return (
    <form
      className={css.profileedit}
      name="profileedit"
      onSubmit={handleSubmit(onEdit)}
    >
      <h1 className={css.profileedit__title}>Привет, {name}!</h1>
      <fieldset className={css.profileedit__inputs}>
        <label className={css.profileedit__titleinput} htmlFor={nameId}>
          Имя
        </label>
        <input
          id={nameId}
          placeholder="Имя"
          className={cx(
            css.profileedit__inputname,
            errors.name && css.profileedit__input_error,
          )}
          {...register('name')}
        />
        <span className={css.profileedit__error_name}>
          {errors.name?.message}
        </span>
        <div className={css.profileedit__line} />
        <label className={css.profileedit__titleinput} htmlFor={emailId}>
          E-mail
        </label>
        <input
          id={emailId}
          className={cx(
            css.profileedit__inputemail,
            errors.email && css.profileedit__input_error,
          )}
          placeholder="Email"
          {...register('email')}
        />
        <span className={css.profileedit__error_email}>
          {errors.email?.message}
        </span>
      </fieldset>
      <p
        className={cx(
          css.profileedit__error,
          !isValid && isSubmitted && css.profileedit__error_visible,
        )}
      >
        При обновлении профиля произошла ошибка.
      </p>
      <button
        className={css.profileedit__buttonsave}
        disabled={isSubmitting || !isDirty || (isSubmitted && !isValid)}
      >
        Сохранить
      </button>
    </form>
  );
};

export default ProfileEdit;
