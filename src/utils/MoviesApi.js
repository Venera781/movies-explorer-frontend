import Api from './Api';
import MovieState from './MovieState';

class MoviesApi extends Api {
  async getListMovies() {
    const movies = await this._getData('beatfilm-movies');
    return movies.map((movie) => {
      return {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
        nameRU: movie.nameRU,
        nameSearch: movie.nameRU.toLowerCase() + movie.nameEN.toLowerCase(),
        nameEN: movie.nameEN,
        id: movie.id,
        state: MovieState.save,
        favId: null,
      };
    });
  }
}

const optionsApi = {
  baseUrl: 'https://api.nomoreparties.co/',
  headers: {
    'Content-Type': 'application/json',
  },
};

const moviesapi = new MoviesApi(optionsApi);

export default moviesapi;
