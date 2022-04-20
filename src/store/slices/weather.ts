import { createSlice } from '@reduxjs/toolkit';
// import { data } from '../../models/index';

const dayGifs = {
  sunny:
    'https://img.wattpad.com/dd954c704a777dc1a1f2a948085b7fd888cdd621/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4d624d55756f67683832624236673d3d2d3739393338303530302e313564316461663930616162633064393139393835343639333537372e676966',
  clouds: 'https://j.gifs.com/vQJxxY.gif',
  Rclouds: 'https://i.gifer.com/1KL7.gif',
  fog: 'https://thumbs.gfycat.com/WelldocumentedFlatCoyote-size_restricted.gif',
  rainy: 'https://c.tenor.com/__gznbyGLKYAAAAC/travel-rain.gif',
  swon: 'https://64.media.tumblr.com/8f8a1a48b69ae147d334edad25564096/tumblr_mmew0okPvR1qh8h77o1_500.gifv',
  ice: 'https://thumbs.gfycat.com/CreamyPolishedClumber-size_restricted.gif',
};
const nigthGifs = {
  sunny:
    'https://64.media.tumblr.com/be91beb44cebd381e129e4daecb53c8d/2c5c167336a62008-26/s500x750/c0b0377ca8bcfe9998b43ce003f1763b9462aea0.gifv',
  clouds: 'https://c.tenor.com/7SyjVdzFqmMAAAAC/stars-night.gif',
  rainy:
    'https://64.media.tumblr.com/5a49546c22cc7dc5eeda64f34c8ee16b/tumblr_o1kb4kg8n71u7gnm9o1_500.gifv',
  storm:
    'https://68.media.tumblr.com/bf4026cb1c2e6e9894a799bf60203785/tumblr_otkozjudaA1wt5cmyo1_500.gif',
  swon: 'https://i.pinimg.com/originals/e7/8e/a7/e78ea7e7403d8c3c1073296400ffec32.gif',
};

const initialState = {
  currentData: {} as any,
  weekData: [] as any,
  cities: [] as any,
  favorites: [] as any,
  isCelsius: true,
  dayGifs: dayGifs,
  nigthGifs: nigthGifs,
  error: null as any,
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
      state.isCelsius = !state.isCelsius;
    },
    errorToggle(state, action) {
      state.error = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
