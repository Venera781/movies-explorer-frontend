import MoviesPage from '../MoviesPage/MoviesPage';
import mainapi from '../../utils/MainApi';
import { useState, useEffect } from 'react';
import MoviesProvider from '../../contexts/MoviesContext';
import Preloader from '../Preloader/Preloader';

const SavedMovies = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const myMovies = await mainapi.getSavedMovies();
        setMovies(myMovies);
      } catch (error) {
        setError(`Ошибка при загрузке: ${error.message}`);
      }
    };
    loadMovies();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (movies) {
    return (
      <MoviesProvider movies={movies}>
        <MoviesPage />
      </MoviesProvider>
    );
  }
  return <Preloader />;
};
export default SavedMovies;
