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
    moviesname: yup
      .string()
      // .min(2, 'Необходимо минимум 2 символа')
      .matches(/^[а-яёa-z]+$/i, 'Необходима кириллица или латиница')
      .required('Нужно ввести название фильма'),
    isShort: yup.boolean(),
  })
  .required();

const SearchForm = () => {
  const { isShort, text } = useSearchState();
  const filterMovies = useFilterMovies();
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, isSubmitted },
  } = useForm({
    defaultValues: { isShort, moviesname: text },
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ moviesname, isShort }) => {
    filterMovies(moviesname, isShort);
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
        control={control}
        name="isShort"
      >
        Короткометражки
      </FilterCheckbox>
      <div className={css.searchform__line}></div>
    </form>
  );
};
export default SearchForm;
