import { Dispatch } from '@reduxjs/toolkit';
import { weatherActions } from './slices/weather';

export const fetchCities = (location: string) => {
  return async (dispatch: Dispatch) => {
    const fetchCitiesData = async () => {
      const fetchCity = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=GbyhLo5LxiyDbG7icJTLOwCJQ0uvt3hw&q=${location}`
      );
      const cityData = await fetchCity.json();

      return cityData;
    };

    try {
      const citiesData = await fetchCitiesData();
      if (!citiesData || citiesData.length === 0) {
        dispatch(weatherActions.errorToggle('City was not found!'));
        return;
      }
      dispatch(weatherActions.loadCitiesData(citiesData));
    } catch (err) {
      dispatch(weatherActions.errorToggle('Server Problem!'));
    }
  };
};

export const fetchCurrentWeather = (location: {
  Key: string;
  LocalizedName: string;
}) => {
  return async (dispatch: Dispatch) => {
    const locationKey = location.Key;
    const fetchData = async () => {
      const response = await fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=GbyhLo5LxiyDbG7icJTLOwCJQ0uvt3hw`
      );

      const data = await response.json();

      return data;
    };

    try {
      const weatherData = await fetchData();
      if (!weatherData || weatherData.length === 0) {
        dispatch(
          weatherActions.errorToggle(
            'Could not reach the current weather for this city!'
          )
        );
        return;
      }

      dispatch(weatherActions.loadCurrentData(weatherData[0]));
    } catch (err) {
      dispatch(weatherActions.errorToggle('Server Problem!'));
    }
  };
};
export const fetchWeekWeather = (location: {
  Key: string;
  LocalizedName: string;
}) => {
  return async (dispatch: Dispatch) => {
    const locationKey = location.Key;
    const fetchData = async () => {
      const response = await fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=GbyhLo5LxiyDbG7icJTLOwCJQ0uvt3hw`
      );

      const data = await response.json();
      return data;
    };

    try {
      const weatherData = await fetchData();
      if (!weatherData || weatherData.length === 0) {
        dispatch(
          weatherActions.errorToggle(
            'Could not reach weather of the next 5 days for this city!'
          )
        );
        return;
      }
      dispatch(weatherActions.loadWeekData(weatherData));
    } catch (err) {
      dispatch(weatherActions.errorToggle('Server Problem!'));
    }
  };
};
