import cx from '../../utils/cx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useId } from 'react';
import * as yup from 'yup';
import css from './ProfileEdit.module.css';

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

const ProfileEdit = ({ onEditFinish }) => {
  const name = 'Виталий';
  const email = 'pochta@yandex.ru';
  const nameId = useId();
  const emailId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name, email },
  });

  const onEdit = ({ name, email }) => {
    console.log(`Имя:${name}, Email:${email}`);
    onEditFinish();
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
      </fieldset>
      <p
        className={cx(
          css.profileedit__error,
          !isValid && isSubmitted && css.profileedit__error_visible,
        )}
      >
        При обновлении профиля произошла ошибка.
      </p>
      <button className={css.profileedit__buttonsave} disabled={isSubmitting}>
        Сохранить
      </button>
    </form>
  );
};

export default ProfileEdit;
