import React from 'react';
import css from './Preloader.module.css';

const Preloader = () => {
  return (
    <div className={css.preloader}>
      <div className={css.preloader__container}>
        <span className={css.preloader__round}></span>
      </div>
    </div>
  );
};

export default Preloader;
