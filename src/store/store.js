import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import filtersReducer from './reducers/filtersReducer'; // Correct relative path

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
