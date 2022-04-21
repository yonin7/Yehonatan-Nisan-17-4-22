import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './slices/weather';

const storeConfigurations = {
  reducer: {
    weather: weatherSlice,
  },
};

const store = configureStore(storeConfigurations);

type RootState = ReturnType<typeof store.getState>;

export const allData = (state: RootState) => state.weather;

export type AppDispatch = typeof store.dispatch;

export default store;
