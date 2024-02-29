import MoviesPage from '../MoviesPage/MoviesPage';
import moviesapi from '../../utils/MoviesApi';
import mainapi from '../../utils/MainApi';
import { useEffect, useState } from 'react';
import MoviesProvider from '../../contexts/MoviesContext';
import MovieState from '../../utils/MovieState';
import Preloader from '../Preloader/Preloader';
import css from '../Movies/Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [allMovies, myMovies] = await Promise.all([
          moviesapi.getListMovies(),
          mainapi.getSavedMovies(),
        ]);
        const myMoviesIds = new Map(myMovies.map((movie) => [movie.id, movie.favId]));
        for (const movie of allMovies) {
          const favId = myMoviesIds.get(movie.id)
          if (favId) {
            movie.state = MovieState.saved;
            movie.favId = favId;
          }
        }

        setMovies(allMovies);
      } catch (error) {
        setError(`Ошибка при загрузке: ${error.message}`);
      }
    };
    loadMovies();
  }, []);

  if (error) {
    return (
      <p className={css.movies}>
        «Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз»
      </p>
    );
  }

  if (movies) {
    return (
      <MoviesProvider movies={movies} saveMovies>
        <MoviesPage />
      </MoviesProvider>
    );
  }
  return <Preloader />;
};
export default Movies;
