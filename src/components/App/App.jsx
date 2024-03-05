import { Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import PathName from '../../utils/PathName';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute';
import CurrentUserProvider from '../../contexts/CurrentUserContext';
const App = () => {
  return (
    <CurrentUserProvider>
      <div className={css.page__content}>
        <Routes>
          <Route
            path={PathName.register}
            element={
              <ProtectedRoute reverse>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path={PathName.login}
            element={
              <ProtectedRoute reverse>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path={PathName.project} element={<Main />} />
          <Route
            path={PathName.movies}
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path={PathName.savedMovies}
            element={
              <ProtectedRoute>
                <SavedMovies />
              </ProtectedRoute>
            }
          />
          <Route
            path={PathName.profile}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path={PathName.notFound} element={<NotFound />} />
          <></>
        </Routes>
      </div>
    </CurrentUserProvider>
  );
};

export default App;
