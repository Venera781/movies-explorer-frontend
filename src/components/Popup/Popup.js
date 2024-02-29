import css from './Popup.module.css';
import cx from '../../utils/cx';

const Popup = ({ text, isSuccess }) => {
  return (
    <div className={cx(css.popup, isSuccess ? css.popup_success : null)}>
      <div
        className={cx(
          isSuccess ? css.popup__iconsuccess : css.popup__iconfailed,
        )}
      ></div>
      <p className={css.popup__text}>{text}</p>
    </div>
  );
};

export default Popup;
