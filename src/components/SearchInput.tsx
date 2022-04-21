import React, { useState, useEffect, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allData, AppDispatch } from '../store';

import {
  fetchCurrentWeather,
  fetchWeekWeather,
  fetchCities,
} from '../store/actions';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { ICity, IFavoriteCity } from '../interfaces/weather';

const SearchInput: React.FC<{
  setAddToFav: (isFav: boolean) => void;
  cityData: (data: ICity) => void;
}> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cities, currentData, favorites } = useSelector(allData);

  const [city, setCity] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (city) {
        dispatch(fetchCities(city));
      }
    }, 400);

    return function cleanup() {
      clearTimeout(delayDebounceFn);
    };
  }, [city, dispatch]);

  const searchHandler = (location: string) => {
    setCity(location);
  };
  const selectedCityHandler = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | ICity
  ) => {
    event.preventDefault();

    const selectedCity = value as ICity;
    props.setAddToFav(
      favorites.some((city: IFavoriteCity) => selectedCity.Key === city.Key)
    );
    props.cityData(selectedCity);
    dispatch(fetchCurrentWeather(selectedCity));
    dispatch(fetchWeekWeather(selectedCity));
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }} style={{ color: '#fff' }}>
      <Autocomplete
        onChange={selectedCityHandler}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={cities}
        getOptionLabel={(option: ICity) =>
          `${option.LocalizedName},${option.Country.LocalizedName}`
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a City..."
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              style: {
                border: currentData.IsDayTime ? 'none' : '1px solid #fff',
                color: currentData.IsDayTime ? 'none' : '#fff',
              },
            }}
            onChange={(e) => searchHandler(e.target.value)}
          />
        )}
      />
    </Stack>
  );
};

export default SearchInput;
