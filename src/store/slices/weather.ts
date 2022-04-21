import { createSlice } from '@reduxjs/toolkit';
import {
  ICity,
  ICurrentWeather,
  IFavoriteCity,
  IWeekDay,
} from '../../interfaces/weather';

interface IState {
  currentData: ICurrentWeather;
  weekData: IWeekDay[];
  cities: ICity[];
  favorites: IFavoriteCity[];
  isCelsius: boolean;
  error: string;
  loading: boolean;
}

const initialState: IState = {
  currentData: {} as ICurrentWeather,
  weekData: [],
  cities: [],
  favorites: [],
  isCelsius: true,
  error: '',
  loading: true,
};

const weatherSlice = createSlice({
  name: 'weatherData',
  initialState,
  reducers: {
    loadCurrentData(state, action) {
      state.currentData = action.payload;
      state.loading = false;
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
        (city: IFavoriteCity) => city.Key !== action.payload.Key
      );
      state.favorites = tempCities;
    },
    temperatureToggle(state) {
      state.isCelsius = !state.isCelsius;
    },
    errorToggle(state, action) {
      state.error = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
