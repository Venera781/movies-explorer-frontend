import { useCallback, useMemo, useState } from 'react';
import Header from '../Header/Header';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import ProfileView from '../ProfileView/ProfileView';
import css from './Profile.module.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [succesEdited, setSuccesEdited] = useState(false);

  const onEditFinish = useCallback(() => {
    setIsEditing(false);
    setSuccesEdited(true);
  }, []);
  const onStartEdit = useCallback(() => {
    setIsEditing(true);
    setSuccesEdited(false);
  }, []);
  const currentEl = useMemo(() => {
    if (isEditing) {
      return <ProfileEdit onEditFinish={onEditFinish}></ProfileEdit>;
    }
    return <ProfileView onStartEdit={onStartEdit}></ProfileView>;
  }, [isEditing, onEditFinish, onStartEdit]);

  return (
    <>
      <Header />
      <main>
        {currentEl}
        {succesEdited && (
          <div className={css.profile}>
            <p className={css.profile__info}>Профиль успешно сохранён</p>
          </div>
        )}
      </main>
    </>
  );
};
export default Profile;
