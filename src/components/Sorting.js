import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../store/reducers/filtersReducer';
import styles from '../styles/Sorting.module.scss';

const sortingOptions = [
  { value: 'cheapest', label: 'Самый дешевый' },
  { value: 'fastest', label: 'Самый быстрый' },
  { value: 'optimal', label: 'Оптимальный' },
];

function Sorting() {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.filters.sortBy);

  return (
    <div className={styles.sorting}>
      {sortingOptions.map((option) => (
        <button
          key={option.value}
          className={`${styles.sorting_title} ${sortBy === option.value ? styles.active : ''}`}
          type="button"
          onClick={() => dispatch(setSortBy(option.value))}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Sorting;
