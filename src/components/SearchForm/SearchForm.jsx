import css from './SearchForm.module.css';
import cx from '../../utils/cx';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFilterMovies, useSearchState } from '../../contexts/MoviesContext';

export const schema = yup
  .object()
  .shape({
    moviesname: yup.string().required('Нужно ввести название фильма'),
  })
  .required();

const SearchForm = () => {
  const { isShort, text } = useSearchState();
  const filterMovies = useFilterMovies();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isValid, isSubmitted },
  } = useForm({
    defaultValues: { moviesname: text },
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ moviesname }) => {
    filterMovies(moviesname, isShort);
  };

  const onShortCheked = () => {
    const moviesName = getValues('moviesname');
    filterMovies(moviesName, !isShort);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css.searchform}
      name="searchform"
    >
      <div className={css.searchform__wrapper}>
        <input
          autoComplete="off"
          placeholder="Фильм"
          className={css.searchform__input}
          {...register('moviesname')}
        />
        <span
          className={cx(
            css.searchform__error,
            !isValid && isSubmitted && css.searchform__error_visible,
          )}
        >
          Нужно ввести ключевое слово
        </span>
        <button
          type="submit"
          className={css.searchform__button}
          disabled={isSubmitting}
        ></button>
      </div>
      <FilterCheckbox
        className={css.searchform__checkbox}
        name="isShort"
        checked={isShort}
        onChecked={onShortCheked}
      >
        Короткометражки
      </FilterCheckbox>
      <div className={css.searchform__line}></div>
    </form>
  );
};
export default SearchForm;
