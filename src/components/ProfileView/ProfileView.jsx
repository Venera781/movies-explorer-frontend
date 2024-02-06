import css from './ProfileView.module.css';

const ProfileView = ({ onStartEdit }) => {
  const name = 'Виталий';
  const email = 'pochta@yandex.ru';

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
      <button className={css.profileview__exit}>Выйти из аккаунта</button>
    </div>
  );
};

export default ProfileView;
