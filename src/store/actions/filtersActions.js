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
    const queryParams = new URLSearchParams({
      searchId: searchId,
      sortBy: sortBy,
      checkboxes: JSON.stringify(checkboxes),
    });

    const url = `https://aviasales-test-api.kata.academy/tickets?${queryParams.toString()}`;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 500) {
            console.warn(`Попытка ${attempt}: сервер вернул 500`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
          }
          throw new Error(`API request failed with status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Ошибка при получении билетов:', error);
        if (attempt === 3) return rejectWithValue(error.message);
      }
    }
  }
);
