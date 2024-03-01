import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import MovieState from '../utils/MovieState';
import { produce } from 'immer';
import mainapi from '../utils/MainApi';
import ShortValueMovie from '../utils/ShortValueMovie';
import Actions from '../utils/Actions';

const MOVIES_KEY = 'currentmovies1';
const MoviesContext = createContext();
const MoviesChangeContext = createContext();

export const useMovies = () => {
  const ctx = useContext(MoviesContext);
  const ctxChange = useContext(MoviesChangeContext);

  return [
    ctx.currentMovies,
    ctx.text !== '',
    ctx.visibleElements,
    ctxChange.setVisibleCount,
  ];
};

export const useModifyFavorite = () => {
  const ctx = useContext(MoviesChangeContext);
  return [ctx.addFavorite, ctx.removeFavorite, ctx.removeFavoriteMain];
};

export const clearSavedMovies = () => {
  localStorage.removeItem(MOVIES_KEY);
};

export const useSearchState = () => {
  const ctx = useContext(MoviesContext);
  return { isShort: ctx.isShort, text: ctx.text };
};

export const useFilterMovies = () => {
  const context = useContext(MoviesChangeContext);
  return context.filterMovies;
};

const initState = ({ movies, isMain }) => {
  try {
    const { currentMovies, text, isShort, visibleElements } = JSON.parse(
      localStorage.getItem(MOVIES_KEY),
    );
    return {
      initMovies: movies,
      currentMovies: isMain ? currentMovies : movies,
      text: isMain ? text : '',
      isShort: isMain ? isShort : false,
      isMain,
      visibleElements,
    };
  } catch (error) {
    console.log(error);
  }
  return {
    initMovies: movies,
    currentMovies: isMain ? null : movies,
    isMain,
    text: '',
    isShort: false,
    visibleElements: -1,
  };
};
const moviesReducer = (state, action) => {
  const newState = produce(state, (draft) => {
    switch (action.type) {
      case Actions.AddFavorite: {
        const movieId = action.movieId;
        for (const movie of draft.initMovies) {
          if (movie.id === movieId) {
            movie.state = MovieState.saved;
            movie.favId = action.favId;
            break;
          }
        }
        for (const movie of draft.currentMovies) {
          if (movie.id === movieId) {
            movie.state = MovieState.saved;
            movie.favId = action.favId;
            break;
          }
        }

        break;
      }
      case Actions.MainRemoveFavorite: {
        const movieId = action.movieId;
        for (const movie of draft.initMovies) {
          if (movie.id === movieId) {
            movie.state = MovieState.save;
            movie.favId = null;
            break;
          }
        }
        for (const movie of draft.currentMovies) {
          if (movie.id === movieId) {
            movie.state = MovieState.save;
            movie.favId = null;
            break;
          }
        }
        break;
      }

      case Actions.RemoveFavorite: {
        const movieId = action.movieId;
        draft.initMovies = draft.initMovies.filter(
          (movie) => movie.id !== movieId,
        );
        draft.currentMovies = draft.currentMovies.filter(
          (movie) => movie.id !== movieId,
        );
        break;
      }
      case Actions.FilterMovies: {
        const text = action.text ?? draft.text;
        const isShort = action.isShort ?? draft.isShort;
        let currentMovies = null;
        if (text) {
          const fixedText = text.toLowerCase();
          currentMovies = draft.initMovies.filter((movie) => {
            if (isShort && movie.duration > ShortValueMovie) {
              return false;
            }
            if (fixedText && !movie.nameSearch.includes(fixedText)) {
              return false;
            }
            return true;
          });
        }
        draft.visibleElements = -1;
        draft.currentMovies = currentMovies;
        draft.text = text;
        draft.isShort = isShort;
        break;
      }
      case Actions.SetVisibleCount: {
        draft.visibleElements = action.count;
        break;
      }
      default:
        break;
    }
  });

  localStorage.setItem(
    MOVIES_KEY,
    JSON.stringify({
      currentMovies: newState.isMain ? newState.currentMovies : null,
      text: newState.isMain ? newState.text : null,
      isShort: newState.isMain ? newState.isShort : null,
      visibleElements: newState.visibleElements,
    }),
  );
  return newState;
};
const MoviesProvider = ({ movies, isMain, children }) => {
  const [state, dispatch] = useReducer(
    moviesReducer,
    { movies, isMain },
    initState,
  );

  const removeFavoriteMain = useCallback(async (movie) => {
    try {
      await mainapi.deleteMovie(movie.favId);
      dispatch({ type: Actions.MainRemoveFavorite, movieId: movie.id });
    } catch {}
  }, []);

  const setVisibleCount = useCallback((count) => {
    dispatch({ type: Actions.SetVisibleCount, count });
  }, []);

  const addFavorite = useCallback(async (movie) => {
    try {
      const savedMovie = await mainapi.addMoviesCard(movie);
      dispatch({
        type: Actions.AddFavorite,
        movieId: movie.id,
        favId: savedMovie._id,
      });
    } catch {}
  }, []);
  const removeFavorite = useCallback(async (movie) => {
    try {
      await mainapi.deleteMovie(movie.favId);
      dispatch({ type: Actions.RemoveFavorite, movieId: movie.id });
    } catch {}
  }, []);
  const filterMovies = useCallback((text, isShort) => {
    dispatch({ type: Actions.FilterMovies, text, isShort });
  }, []);
  const allFuncs = useMemo(() => {
    return {
      addFavorite,
      removeFavorite,
      filterMovies,
      removeFavoriteMain,
      setVisibleCount,
    };
  }, [
    addFavorite,
    removeFavorite,
    filterMovies,
    removeFavoriteMain,
    setVisibleCount,
  ]);

  return (
    <MoviesChangeContext.Provider value={allFuncs}>
      <MoviesContext.Provider value={state}>{children}</MoviesContext.Provider>
    </MoviesChangeContext.Provider>
  );
};

export default MoviesProvider;
