import { createSlice } from '@reduxjs/toolkit';
type favorite = {
  id: string;
  name: string;
  weather: string;
};
const initialState = {
  currentData: {},
  weekData: [] as any,
  cities: [] as any,
  favorites: [] as any,
  isCelsius: true,
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
    },
    addToFavorites(state, action) {
      state.favorites = state.favorites.concat(action.payload);
    },
    removeFromFavorites(state, action) {
      const tempCities = state.favorites.filter(
        (city: any) => city.id !== action.payload.id
      );
      state.favorites = tempCities;
    },
    temperatureToggle(state) {
      console.log(state.isCelsius);

      state.isCelsius = !state.isCelsius;
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
