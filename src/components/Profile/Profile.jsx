import { useId } from 'react';
import { Link } from 'react-router-dom';
import css from '../Profile/Profile.module.css';
import Header from '../Header/Header';
import cx from '../../utils/cx';

const Profile = () => {
  const name = 'Виталий';
  const email = 'mv781781@yandex.ru';
  const nameId = useId();
  const emaiId = useId();

  return (
    <>
      <Header />
      <form className={css.profileform} name="profileform" action="#">
        <h1 className={css.profileform__title}>Привет, {name}!</h1>
        <fieldset className={css.profileform__inputs}>
          <label className={css.profileform__titleinput} htmlFor={nameId}>
            Имя{' '}
          </label>
          <input
            id={nameId}
            className={css.profileform__input}
            placeholder="Имя"
            value={name}
          />

          <div className={css.profileform__line} />
          <label className={css.profileform__titleinput} htmlFor={emaiId}>
            Email
          </label>
          <input
            id={emaiId}
            className={css.profileform__input}
            placeholder="Email"
            value={email}
          />
        </fieldset>
        <Link
          to="/profile"
          className={cx(css.profileform__button, 'button__link')}
        >
          Редактировать
        </Link>
        <Link to="/" className={cx(css.profileform__exit, 'button__link')}>
          Выйти из аккаунта
        </Link>
      </form>
    </>
  );
};
export default Profile;
