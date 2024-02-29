import Api from './Api';
import MovieState from './MovieState';

const normalizeUser = (data) => {
  return {
    name: data.name,
    email: data.email,
  };
};

class MainApi extends Api {
  //получить данные пользователя
  async getInfoUser() {
    const user = await this._getData('users/me', true);
    return normalizeUser(user);
  }

  async authorize({ email, password }) {
    return await this._sendData('signin', 'POST', true, { email, password });
  }

  async register({ name, email, password }) {
    return await this._sendData('signup', 'POST', true, {
      name,
      email,
      password,
    });
  }

  async signout() {
    return await this._sendData('signout', 'POST', true);
  }

  //обновляет данные о пользователе
  async editProfile({ newName, newEmail }) {
    const updatedUser = await this._sendData('users/me', 'PATCH', true, {
      newName,
      newEmail,
    });
    return normalizeUser(updatedUser);
  }

  // возвращает все сохранённые текущим пользователем карточки фильмов
  async getSavedMovies() {
    const movies = await this._getData('movies', true);
    return movies.map((movie) => {
      return {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        trailerLink: movie.trailerLink,
        thumbnail: movie.image,
        nameRU: movie.nameRU,
        nameSearch: movie.nameRU.toLowerCase() + movie.nameEN.toLowerCase(),
        nameEN: movie.nameEN,
        id: movie.movieId,
        state: MovieState.delete,
        favId: movie._id,
      };
    });
  }

  //добавить карточку фильма
  addMoviesCard({
    country,
    director,
    duration,
    year,
    description,
    thumbnail,
    trailerLink,
    nameRU,
    nameEN,
    // thumbnail,
    id,
  }) {
    return this._sendData('movies', 'POST', true, {
      country,
      director,
      duration,
      year,
      description,
      image: thumbnail,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId: id,
    });
  }

  //удалить карточку фильма (DELETE)
  deleteMovie(id) {
    return this._sendData(`movies/${id}`, 'DELETE', true);
  }
}

const optionsApi = {
  baseUrl: 'http://127.0.0.1:4000',
  headers: {
    'Content-Type': 'application/json',
  },
};

const mainapi = new MainApi(optionsApi);

export default mainapi;
