import { useMemo } from 'react';
import css from './MoviesCard.module.css';
import MovieState from '../../utils/MovieState';
import Duration from '../Duration/Duration';
import { useModifyFavorite } from '../../contexts/MoviesContext';

const MoviesCard = ({ movie }) => {
  const [addFavorite, removeFavorite, removeFavoriteMain] = useModifyFavorite();
  const { nameRU, duration, thumbnail, state, trailerLink } = movie;

  const activeButton = useMemo(() => {
    switch (state) {
      case MovieState.save:
        return (
          <button
            className={css.moviescard__iconsave}
            type="button"
            aria-label='"Сохранить фильм'
            onClick={() => {
              addFavorite(movie);
            }}
          >
            Сохранить
          </button>
        );
      case MovieState.saved:
        return (
          <button
            className={css.moviescard__iconsaved}
            aria-label="Выбран фильм"
            type='button'
            onClick ={() => {
              removeFavoriteMain(movie);
            }}
          ></button>
        );
      // case MovieState.delete:
      default:
        return (
          <button
            className={css.moviescard__icondelete}
            type="button"
            aria-label="Удалить фильм"
            onClick={() => {
              removeFavorite(movie);
            }}
          ></button>
        );
    }
  }, [state, addFavorite, removeFavorite, movie, removeFavoriteMain]);

  return (
    <article className={css.moviescard}>
      <a
        href={trailerLink}
        target="_blank"
        className={css.moviescard__link}
        rel="noreferrer"
      >
        <img
          className={css.moviescard__image}
          src={thumbnail}
          alt="Изображение из фильма"
        />
      </a>
      {activeButton}
      <h2 className={css.moviescard__title}>{nameRU}</h2>
      <Duration className={css.moviescard__duration} value={duration} />
    </article>
  );
};
export default MoviesCard;
