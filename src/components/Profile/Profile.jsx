import { useCallback, useMemo, useState } from 'react';
import Header from '../Header/Header';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import ProfileView from '../ProfileView/ProfileView';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const onEditFinish = useCallback(() => {
    setIsEditing(false);
  }, []);
  const onStartEdit = useCallback(() => {
    setIsEditing(true);
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
      {currentEl}
    </>
  );
};
export default Profile;
