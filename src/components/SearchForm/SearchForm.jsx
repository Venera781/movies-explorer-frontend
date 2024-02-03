import css from './SearchForm.module.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <form action="#" className={css.searchform} name="searchform">
      <div className={css.searchform__wrapper}>
        <input
          className={css.searchform__input}
          type="text"
          name="searchfilm"
          value=""
          required
          autoComplete="off"
          placeholder="Фильм"
        />
        <button
          type="submit"
          className={css.searchform__button}
        ></button>
      </div>
      <FilterCheckbox className={css.searchform__checkbox} />
      <div className={css.searchform__line}></div>
    </form>
  );
};
export default SearchForm;
