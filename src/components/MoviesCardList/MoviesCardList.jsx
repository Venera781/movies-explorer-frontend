import css from './MoviesCardList.module.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useRef, useState } from 'react';
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
  const [movies, isSearchMode, visibleCount, setVisibleCount] = useMovies();
  const lastVisibleCount = useRef(visibleCount);
  const [realVisibleCount, setRealVisibleCount] = useState(visibleCount);

  useEffect(() => {
    if (visibleCount === -1) {
      const { minCards } = getCardsValues();
      lastVisibleCount.current = minCards;
      setRealVisibleCount(minCards);
    } else {
      lastVisibleCount.current = visibleCount;
      setRealVisibleCount(visibleCount);
    }
  }, [visibleCount]);

  useEffect(() => {
    let isBusy = false;
    const onResize = () => {
      if (isBusy) {
        return;
      }
      isBusy = true;

      requestAnimationFrame(() => {
        const count = lastVisibleCount.current;
        const { minCards, newCount } = getCardsValues();
        if (count < minCards) {
          setVisibleCount(minCards);
        } else {
          const newLength = count - minCards;
          const correctNewLength = Math.ceil(newLength / newCount) * newCount;
          if (newLength !== correctNewLength) {
            setVisibleCount(minCards + correctNewLength);
          }
        }

        isBusy = false;
      });
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () =>
      window.removeEventListener('resize', onResize, { passive: true });
  }, []);

  const showMoreMovies = () => {
    const { newCount } = getCardsValues();
    setVisibleCount(lastVisibleCount.current + newCount);
  };

  const count = realVisibleCount;

  return (
    <>
      <section className={css.moviescardlist}>
        <ul className={css.moviescardlist__items}>
          {movies && movies.length !== 0 && count !== -1 ? (
            movies.slice(0, count).map((movie) => {
              return (
                <li className={css.moviescardlist__element} key={movie.id}>
                  <MoviesCard movie={movie} />
                </li>
              );
            })
          ) : isSearchMode && count !== -1 ? (
            <p className={css.moviescardlist__message}>Ничего не найдено</p>
          ) : null}
        </ul>
      </section>
      {movies && movies.length > count && count !== -1 ? (
        <button className={css.moviescardlist__button} onClick={showMoreMovies}>
          Ещё
        </button>
      ) : null}
    </>
  );
};
export default MoviesCardList;
