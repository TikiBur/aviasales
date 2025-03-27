import { createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = 'https://aviasales-test-api.kata.academy';

export const fetchSearchId = createAsyncThunk(
  'tickets/fetchSearchId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/search`);
      if (!response.ok) throw new Error('Ошибка получения searchId');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTickets = createAsyncThunk(
  'filters/fetchTickets',
  async ({ searchId, sortBy, checkboxes }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        searchId: searchId,
        sortBy: sortBy,
        checkboxes: JSON.stringify(checkboxes),
      });

      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return rejectWithValue(error.message);
    }
  }
);
