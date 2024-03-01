import { useId } from 'react';
import css from './FilterCheckbox.module.css';

const FilterCheckbox = ({ children, className, checked, onChecked }) => {
  const checkId = useId();

  return (
    <div className={className}>
      <input
        className={css.filtercheckbox__checkbox}
        id={checkId}
        type="checkbox"
        onChange={onChecked}
        checked={checked}
      />
      <label className={css.filtercheckbox__checklabel} htmlFor={checkId}>
        {children}
      </label>
    </div>
  );
};

export default FilterCheckbox;
