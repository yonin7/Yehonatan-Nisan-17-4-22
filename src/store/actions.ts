import { weatherActions } from './slices/weather';

export const fetchCities = (location: string) => {
  return async (dispatch: any) => {
    const fetchCitiesData = async () => {
      const fetchCity = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=nE80NogMsaAGjkVaejrJ6xgAMXa0n4Cv&q=${location}`
      );

      if (!fetchCity.ok) {
        throw new Error('Could not fetch city data!');
      }

      const cityData = await fetchCity.json();

      return cityData;
    };

    try {
      const citiesData = await fetchCitiesData();
      dispatch(weatherActions.loadCitiesData(citiesData) as any);
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCurrentWeather = (location: {
  Key: string;
  LocalizedName: string;
}) => {
  return async (dispatch: any) => {
    console.log(location);

    const locationKey = location.Key;
    const locationName = location.LocalizedName;
    const fetchData = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=nE80NogMsaAGjkVaejrJ6xgAMXa0n4Cv`
      );

      if (!response.ok) {
        throw new Error('Could not fetch weather data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const weatherData = await fetchData();

      dispatch(weatherActions.loadCurrentData(weatherData[0]) as any);
    } catch (err) {
      console.log(err);
    }
  };
};
export const fetchWeekWeather = (location: {
  Key: string;
  LocalizedName: string;
}) => {
  return async (dispatch: any) => {
    console.log(location);

    const locationKey = location.Key;
    const locationName = location.LocalizedName;
    const fetchData = async () => {
      const response = await fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=nE80NogMsaAGjkVaejrJ6xgAMXa0n4Cv`
      );

      if (!response.ok) {
        throw new Error('Could not fetch weather data!');
      }

      const data = await response.json();
      return data;
    };

    try {
      const weatherData = await fetchData();
      dispatch(weatherActions.loadWeekData(weatherData) as any);
    } catch (err) {
      console.log(err);
    }
  };
};
