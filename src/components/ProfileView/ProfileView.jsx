import { useCallback } from 'react';
import css from './ProfileView.module.css';
import { clearSavedMovies } from '../../contexts/MoviesContext';
import mainapi from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import { useUserEmail, useUserName } from '../../contexts/CurrentUserContext';

const ProfileView = ({ onStartEdit }) => {
  const name = useUserName();
  const email = useUserEmail();
  const navigate = useNavigate();

  const doExit = useCallback(async () => {
    try {
      await mainapi.signout();
      clearSavedMovies();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  return (
    <div className={css.profileview}>
      <h1 className={css.profileview__title}>Привет, {name}!</h1>
      <div className={css.profileview__inputs}>
        <p className={css.profileview__nametitle}>Имя</p>
        <p className={css.profileview__namevalue}>{name}</p>
        <div className={css.profileview__line} />
        <p className={css.profileview__emailtitle}>E-mail</p>
        <p className={css.profileview__emailvalue}>{email}</p>
      </div>
      <button className={css.profileview__button} onClick={onStartEdit}>
        Редактировать
      </button>
      <button className={css.profileview__exit} onClick={doExit}>
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default ProfileView;
