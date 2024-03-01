import css from './MoviesCardList.module.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useRef, useState } from 'react';
import { useMovies } from '../../contexts/MoviesContext';
import CardsCount from '../../utils/CardsCount';
import ScreenSize from '../../utils/ScreenSize';
import VisCount from '../../utils/VisCount';

const getCardsValues = () => {
  const width = window.innerWidth;
  let minCards = CardsCount.mobile;
  let newCount = CardsCount.mobileNewCount;
  if (width >= ScreenSize.web) {
    minCards = CardsCount.web;
    newCount = CardsCount.webNewCount;
  } else if (width >= ScreenSize.iPad) {
    minCards = CardsCount.iPad;
  }
  return { minCards, newCount };
};

const MoviesCardList = () => {
  const [movies, isSearchMode, visibleCount, setVisibleCount] = useMovies();
  const lastVisibleCount = useRef(visibleCount);
  const [realVisibleCount, setRealVisibleCount] = useState(visibleCount);

  useEffect(() => {
    if (visibleCount === VisCount.mines) {
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
  }, [setVisibleCount]);

  const showMoreMovies = () => {
    const { newCount } = getCardsValues();
    setVisibleCount(lastVisibleCount.current + newCount);
  };

  const count = realVisibleCount;

  return (
    <>
      <section className={css.moviescardlist}>
        <ul className={css.moviescardlist__items}>
          {movies &&
          movies.length !== VisCount.plus &&
          count !== VisCount.mines ? (
            movies.slice(0, count).map((movie) => {
              return (
                <li className={css.moviescardlist__element} key={movie.id}>
                  <MoviesCard movie={movie} />
                </li>
              );
            })
          ) : isSearchMode && count !== VisCount.mines ? (
            <p className={css.moviescardlist__message}>Ничего не найдено</p>
          ) : null}
        </ul>
      </section>
      {movies && movies.length > count && count !== VisCount.mines ? (
        <button className={css.moviescardlist__button} onClick={showMoreMovies}>
          Ещё
        </button>
      ) : null}
    </>
  );
};
export default MoviesCardList;
