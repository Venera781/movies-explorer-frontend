import { useId } from 'react';

import css from './FilterCheckbox.module.css';

const FilterCheckbox = ({ className }) => {
  const id = useId();
  return (
    <div className={className}>
      <input
        className={css.filtercheckbox__checkbox}
        id={id}
        type="checkbox"
        name="filter"
      />
      <label className={css.filtercheckbox__checklabel} htmlFor={id}>
        Короткометражки
      </label>
    </div>
  );
};

export default FilterCheckbox;
