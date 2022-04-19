import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentData: {},
  weekData: [] as any,
  cities: [] as any,
  favorites: [] as any,
};

const weatherSlice = createSlice({
  name: 'weatherData',
  initialState,
  reducers: {
    loadCurrentData(state, action) {
      state.currentData = action.payload;
    },
    loadWeekData(state, action) {
      state.weekData = action.payload.DailyForecasts;
    },
    loadCitiesData(state, action) {
      state.cities = action.payload;
      console.log(state.cities);
    },
    addToFavorites(state, action) {
      state.favorites = state.favorites.concat(action.payload);
    },
    removeFromFavorites(state, action) {
      const tempCities = state.favorites.filter(
        (city: any) => city.Link !== action.payload.Link
      );
      state.favorites = tempCities;
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
