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
  let sizeId = ScreenSize.mobile;
  if (width >= ScreenSize.web) {
    sizeId = ScreenSize.web;
    minCards = CardsCount.web;
    newCount = CardsCount.webNewCount;
  } else if (width >= ScreenSize.iPad) {
    sizeId = ScreenSize.iPad;
    minCards = CardsCount.iPad;
  }
  return { minCards, newCount, sizeId };
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
    let { sizeId } = getCardsValues();
    const onResize = () => {
      if (isBusy) {
        return;
      }
      isBusy = true;

      requestAnimationFrame(() => {
        const { sizeId: newSizeId, minCards } = getCardsValues();
        if (newSizeId !== sizeId) {
          setVisibleCount(minCards);
          sizeId = newSizeId;
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
        {movies &&
        movies.length !== VisCount.plus &&
        count !== VisCount.mines ? (
          <ul className={css.moviescardlist__items}>
            {movies.slice(0, count).map((movie) => {
              return (
                <li className={css.moviescardlist__element} key={movie.id}>
                  <MoviesCard movie={movie} />
                </li>
              );
            })}{' '}
          </ul>
        ) : isSearchMode && count !== VisCount.mines ? (
          <p className={css.moviescardlist__message}>Ничего не найдено</p>
        ) : null}
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
