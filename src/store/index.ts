import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './slices/weather';

const storeConfigurations = {
  reducer: {
    weather: weatherSlice,
  },
};

const store = configureStore(storeConfigurations);

export default store;
