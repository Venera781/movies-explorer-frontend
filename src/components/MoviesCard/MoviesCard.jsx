import { useMemo } from 'react';
import css from './MoviesCard.module.css';
import MovieState from '../../utils/MovieState';

const MoviesCard = ({ onMovieLike, onDeleteClick, name, duration, imageUrl, state }) => {

  const activeButton = useMemo(() => {
    switch (state) {
      case MovieState.save:
        return (
          <button
            className={css.moviescard__iconsave}
            type="button"
            aria-label='"Сохранить фильм'
          >
            Сохранить
          </button>
        );
      case MovieState.saved:
        return (
          <button
            className={css.moviescard__iconsaved}
            type="button"
            aria-label="Выбран фильм"
          ></button>
        );
      // case MovieState.delete:
      default:
        return (
          <button
            className={css.moviescard__icondelete}
            type="button"
            aria-label="Удалить фильм"
          ></button>
        );
    }
  }, [state]);

  return (
    <article className={css.moviescard}>
      <img
        className={css.moviescard__image}
        src={imageUrl}
        alt="Изображение из фильма"
      />
      {activeButton}
      <h2 className={css.moviescard__title}>{name}</h2>
      <p className={css.moviescard__duration}>{duration}</p>
    </article>
  );
};
export default MoviesCard;
