import css from './MoviesCardList.module.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState, useRef } from 'react';
import { useMovies } from '../../contexts/MoviesContext';

const getCardsValues = () => {
  const width = window.innerWidth;
  let minCards = 5;
  let newCount = 2;
  if (width >= 1280) {
    minCards = 12;
    newCount = 3;
  } else if (width >= 768) {
    minCards = 8;
  }
  return { minCards, newCount };
};

const MoviesCardList = () => {
  const [movies, isSearchMode] = useMovies();
  const lastMovies = useRef(null);
  const [showMovies, setShowMovies] = useState(null);

  useEffect(() => {
    if (movies === null || movies.length === 0) {
      setShowMovies(null);
      return;
    }
    const { minCards } = getCardsValues();
    lastMovies.current = movies;
    setShowMovies(movies.slice(0, minCards));
  }, [movies]);

  useEffect(() => {
    let isBusy = false;
    const onResize = () => {
      if (isBusy) {
        return;
      }
      isBusy = true;

      requestAnimationFrame(() => {
        const movies = lastMovies.current;
        const { minCards, newCount } = getCardsValues();
        setShowMovies((old) => {
          if (old.length < minCards) {
            return movies.slice(0, minCards);
          }
          const newLength = old.length - minCards;
          const correctNewLength = Math.ceil(newLength / newCount) * newCount;
          if (newLength === correctNewLength) {
            return old;
          }
          return movies.slice(0, minCards + correctNewLength);
        });
        isBusy = false;
      });
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () =>
      window.removeEventListener('resize', onResize, { passive: true });
  }, []);

  const showMoreMovies = () => {
    const { newCount } = getCardsValues();
    setShowMovies((old) => {
      return movies.slice(0, old.length + newCount);
    });
  };

  return (
    <>
      <section className={css.moviescardlist}>
        <ul className={css.moviescardlist__items}>
          {showMovies && showMovies.length !== 0 ? (
            showMovies.map((movie) => {
              return (
                <li className={css.moviescardlist__element} key={movie.id}>
                  <MoviesCard movie={movie} />
                </li>
              );
            })
          ) : isSearchMode ? (
            <p className={css.moviescardlist__message}>Ничего не найдено</p>
          ) : null}
        </ul>
      </section>
      {movies && showMovies && movies.length > showMovies.length ? (
        <button className={css.moviescardlist__button} onClick={showMoreMovies}>
          Ещё
        </button>
      ) : null}
    </>
  );
};
export default MoviesCardList;
