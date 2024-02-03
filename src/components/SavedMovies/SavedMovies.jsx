import MoviesPage from '../MoviesPage/MoviesPage';
import MovieState from '../../utils/MovieState';

const movies = [
  {
    id: 1,
    name: '33 слова о дизайне',
    duration: '1ч 17м',
    imageUrl: '/images/film.jpg',
    state: MovieState.delete,
  },
  {
    id: 2,
    name: '33 слова о дизайне',
    duration: '1ч 17м',
    imageUrl: '/images/film.jpg',
    state: MovieState.delete,
  },
  {
    id: 3,
    name: '33 слова о дизайне',
    duration: '1ч 17м',
    imageUrl: '/images/film.jpg',
    state: MovieState.delete,
  },
];

const SavedMovies = () => {
  return (
    <>
      <MoviesPage movies={movies}/>
    </>
  );
};
export default SavedMovies;
