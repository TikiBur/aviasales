import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../store/reducers/filtersReducer';
import styles from '../styles/Filters.module.scss';

const filterOptions = [
  { value: 'all', label: 'Все', id: 'filter-all' },
  { value: '0', label: 'Без пересадок', id: 'filter-0' },
  { value: '1', label: '1 пересадка', id: 'filter-1' },
  { value: '2', label: '2 пересадки', id: 'filter-2' },
  { value: '3', label: '3 пересадки', id: 'filter-3' },
];

function Filters() {
  const dispatch = useDispatch();
  const checkboxes = useSelector((state) => state.filters.checkboxes);

  const handleChange = (value) => {
    dispatch(toggleFilter(value));
  };

  return (
    <div className={styles.filters}>
      <h3 className={styles.filters_title}>Количество пересадок</h3>
      {filterOptions.map((option) => (
        <label key={option.value} htmlFor={option.id} className={styles.filters_info}>
          <input
            id={option.id}
            type="checkbox"
            checked={checkboxes[option.value]}
            onChange={() => handleChange(option.value)}
          />
          <span className={styles.filters_text}>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export default Filters;
