import css from './MoviesCardList.module.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import cx from '../../utils/cx';

const MoviesCardList = ({ className, movies }) => {
  return (
    <ul className={cx(css.moviescardlist, className)}>
      {movies.map((movie) => {
        return (
          <li className={css.moviescardlist__element} key={movie.id}>
            <MoviesCard
              name={movie.name}
              duration={movie.duration}
              imageUrl={movie.imageUrl}
              state={movie.state}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default MoviesCardList;
