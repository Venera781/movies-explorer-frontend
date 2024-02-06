import css from './MoviesPage.module.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import cx from '../../utils/cx';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const MoviesPage = ({ showMore = false, movies }) => {
  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <div
          className={cx(
            showMore && css.moviespage__withmore,
            !showMore && css.moviespage__withoutmore,
          )}
        >
          <MoviesCardList className={css.moviespage__movies} movies={movies} />
        </div>
        {showMore && <button className={css.moviespage__button}>Ещё</button>}
      </main>
      <Footer />
    </>
  );
};
export default MoviesPage;
