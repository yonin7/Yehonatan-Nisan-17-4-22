import { Dispatch } from '@reduxjs/toolkit';
import { weatherActions } from './slices/weather';

let notification = { message: '', severity: '' };
export const fetchCities = (location: string) => {
  return async (dispatch: Dispatch) => {
    const fetchCitiesData = async () => {
      const fetchCity = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=oZQjGkvqAbBJuX7Cg4qkYO5dEDwWkYMi&q=${location}`
      );
      console.log(fetchCity);

      const cityData = await fetchCity.json();

      return cityData;
    };

    try {
      const citiesData = await fetchCitiesData();
      if (!citiesData || citiesData.length === 0) {
        notification.message = 'City was not found!';
        notification.severity = 'error';

        dispatch(weatherActions.errorToggle(notification));
        return;
      }
      dispatch(weatherActions.loadCitiesData(citiesData));
    } catch (err) {
      notification.message = 'Server Problem!';
      notification.severity = 'error';
      dispatch(weatherActions.errorToggle(notification));
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
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=oZQjGkvqAbBJuX7Cg4qkYO5dEDwWkYMi`
      );

      const data = await response.json();

      return data;
    };

    try {
      const weatherData = await fetchData();
      if (!weatherData || weatherData.length === 0) {
        notification.message =
          'Could not reach the current weather for this city!';
        notification.severity = 'error';
        dispatch(weatherActions.errorToggle(notification));
        return;
      }

      dispatch(weatherActions.loadCurrentData(weatherData[0]));
    } catch (err) {
      notification.message = 'Server Problem!';
      notification.severity = 'error';
      dispatch(weatherActions.errorToggle(notification));
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
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=oZQjGkvqAbBJuX7Cg4qkYO5dEDwWkYMi`
      );

      const data = await response.json();
      return data;
    };

    try {
      const weatherData = await fetchData();
      if (!weatherData || weatherData.length === 0) {
        notification.message =
          'Could not reach weather of the next 5 days for this city!';
        notification.severity = 'error';
        dispatch(weatherActions.errorToggle(notification));
        return;
      }
      dispatch(weatherActions.loadWeekData(weatherData));
    } catch (err) {
      notification.message = 'Server Problem!';
      notification.severity = 'error';
      dispatch(weatherActions.errorToggle(notification));
    }
  };
};
