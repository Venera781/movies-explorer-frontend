import { useId } from 'react';
import css from './FilterCheckbox.module.css';
import { useController } from 'react-hook-form';

const FilterCheckbox = ({ children, className, control, name }) => {
  const checkId = useId();

  const { field } = useController({ control, name });
  return (
    <div className={className}>
      <input
        className={css.filtercheckbox__checkbox}
        id={checkId}
        type="checkbox"
        {...field}
        checked={field.value}
      />
      <label className={css.filtercheckbox__checklabel} htmlFor={checkId}>
        {children}
      </label>
    </div>
  );
};

export default FilterCheckbox;
