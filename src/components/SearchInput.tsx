import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCurrentWeather,
  fetchWeekWeather,
  fetchCities,
} from '../store/actions';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const SearchInput: React.FC<{ setAddToFav: (bool: boolean) => void }> = (
  props
) => {
  const dispatch = useDispatch();
  const { cities }: any = useSelector<{ weather: { cities: string[] } }>(
    (state) => state.weather
  );
  const { favorites }: any = useSelector<{ weather: { favorites: string[] } }>(
    (state) => state.weather
  );

  const [city, setCity] = useState('');

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchCities(city) as any);
    }, 1000);

    clearTimeout();
  }, [city, dispatch]);

  const searchHandler = (location: string) => {
    props.setAddToFav(false);
    setCity(location);
  };
  const selectedCityHandler = (e: any, value: any) => {
    console.log(value.Key);
    dispatch(fetchCurrentWeather(value.Key) as any);
    dispatch(fetchWeekWeather(value.Key) as any);
    const isFav = favorites.find((city: any) => value.Key === city);
    if (isFav) props.setAddToFav(false);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Autocomplete
        onChange={selectedCityHandler}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={cities}
        getOptionLabel={(option: any) =>
          `${option.LocalizedName},${option.Country.LocalizedName}`
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onChange={(e) => searchHandler(e.target.value)}
          />
        )}
      />
    </Stack>
  );
};

export default SearchInput;
