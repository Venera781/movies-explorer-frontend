import MoviesPage from '../MoviesPage/MoviesPage';
import MovieState from '../../utils/MovieState';

const movies = [
  {
    id: 1,
    name: '33 слова о дизайне',
    duration: '1ч 17м',
    imageUrl: '/images/film.jpg',
    state: MovieState.save,
  },
  {
    id: 2,
    name: 'Киноальманах «100 лет дизайна»',
    duration: '1ч 17м',
    imageUrl: '/images/film.jpg',
    state: MovieState.saved,
  },
  {
    id: 3,
    name: '33 слова о дизайне',
    duration: '1ч 17м',
    imageUrl: '/images/film.jpg',
    state: MovieState.save,
  },
];
const Movies = () => {
  const showMore = true;
  return (
    <>
      <MoviesPage showMore={showMore} movies={movies} />
    </>
  );
};
export default Movies;
