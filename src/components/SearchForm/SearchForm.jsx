import css from './SearchForm.module.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    moviesname: yup.string().required(),
  })
  .required();

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSearch = ({ moviesname }) => {
    console.log(`Название фильма:${moviesname}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSearch)}
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
        <button
          type="submit"
          className={css.searchform__button}
          disabled={isSubmitting}
        ></button>
      </div>
      <FilterCheckbox className={css.searchform__checkbox} />
      <div className={css.searchform__line}></div>
    </form>
  );
};
export default SearchForm;
