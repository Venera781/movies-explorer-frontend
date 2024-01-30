import css from './MoviesCardList.module.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MovieState from '../../utils/MovieState';
import cx from '../../utils/cx';

const MoviesCardList = ({className}) => {
  return (
    <ul className={cx (css.moviescardlist, className)}>
      <li className={css.moviescardlist__element}>
        <MoviesCard
          name="33 слова о дизайне"
          duration="1ч 17м"
          imageUrl="/images/film.jpg"
          state={MovieState.delete}
        />
      </li>
      <li>
        <MoviesCard
          name="Киноальманах «100 лет дизайна»"
          duration="1ч 17м"
          imageUrl="/images/film.jpg"
          state={MovieState.saved}
        />
      </li>
      <li>
        <MoviesCard
          name="В погоне за Бенкси"
          duration="1ч 17м"
          imageUrl="/images/film.jpg"
          state={MovieState.save}
        />
      </li>
      <li className={css.moviescardlist__element}>
        <MoviesCard
          name="33 слова о дизайне"
          duration="1ч 17м"
          imageUrl="/images/film.jpg"
          state={MovieState.delete}
        />
      </li>
      <li>
        <MoviesCard
          name="Киноальманах «100 лет дизайна»"
          duration="1ч 17м"
          imageUrl="/images/film.jpg"
          state={MovieState.saved}
        />
      </li>
      <li>
        <MoviesCard
          name="В погоне за Бенкси"
          duration="1ч 17м"
          imageUrl="/images/film.jpg"
          state={MovieState.save}
        />
      </li>
      <li className={css.moviescardlist__element}>
        <MoviesCard
          name="33 слова о дизайне"
          duration="1ч 17м"
          imageUrl="/images/film.jpg"
          state={MovieState.delete}
        />
      </li>
      <li>
        <MoviesCard
          name="Киноальманах «100 лет дизайна»"
          duration="1ч 17м"
          imageUrl="/images/film.jpg"
          state={MovieState.saved}
        />
      </li>
    </ul>
  );
};
export default MoviesCardList;
