import { Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import PathName from '../../utils/PathName';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Protected from '../Protected';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

const App = () => {
  return (
    <div className={css.page__content}>
      <Routes>
        <Route path={PathName.register} element={<Register />} />
        <Route path={PathName.login} element={<Login />} />
        <Route path={PathName.project} element={<Main />} />
        <Route
          path={PathName.movies}
          element={
            <Protected>
              <Movies />
            </Protected>
          }
        />
        <Route
          path={PathName.savedMovies}
          element={
            <Protected>
              <SavedMovies />
            </Protected>
          }
        />
        <Route
          path={PathName.profile}
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path={PathName.notFound} element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
