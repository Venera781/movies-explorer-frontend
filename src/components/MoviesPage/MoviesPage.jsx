import css from './MoviesPage.module.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import cx from '../../utils/cx';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const MoviesPage = ({ showMore = false }) => {
  return (
    <>
      <Header />
      <SearchForm />
      <div
        className={cx(
          showMore && css.moviespage__withmore,
          !showMore && css.moviespage__withoutmore,
        )}
      >
        <MoviesCardList className={css.moviespage__movies} />
      </div>
      {showMore && (
        <button className={cx(css.moviespage__button, 'button')}>Ещё</button>
      )}
      <Footer />
    </>
  );
};
export default MoviesPage;
