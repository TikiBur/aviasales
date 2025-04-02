import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchId, fetchTickets } from '../actions/filtersActions';

const initialState = {
  checkboxes: {
    all: true,
    0: true,
    1: true,
    2: true,
    3: true,
  },
  sortBy: 'cheapest',
  tickets: [],
  isLoading: false,
  error: null,
  searchId: null,
  stop: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      const value = action.payload;

      if (value === 'all') {
        const newAllState = !state.checkboxes.all;
        state.checkboxes = {
          all: newAllState,
          0: newAllState,
          1: newAllState,
          2: newAllState,
          3: newAllState,
        };
      } else {
        state.checkboxes[value] = !state.checkboxes[value];
        const allChecked = ['0', '1', '2', '3'].every((key) => state.checkboxes[key]);
        state.checkboxes.all = allChecked;
      }
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchId = action.payload.searchId;
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = [...state.tickets, ...action.payload.tickets]; // Добавляем новые билеты
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFilter, setSortBy } = filtersSlice.actions;
export default filtersSlice.reducer;
