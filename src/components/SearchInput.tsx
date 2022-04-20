import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allData } from '../store';

import {
  fetchCurrentWeather,
  fetchWeekWeather,
  fetchCities,
} from '../store/actions';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const SearchInput: React.FC<{
  setAddToFav: (bool: boolean) => void;
  cityData: (data: any) => void;
}> = (props) => {
  const dispatch = useDispatch();
  const { cities, currentData, favorites } = useSelector(allData);

  const [city, setCity] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (city) {
        dispatch(fetchCities(city) as any);
      }
    }, 400);

    return function cleanup() {
      clearTimeout(delayDebounceFn);
    };
  }, [city, dispatch]);

  const searchHandler = (location: string) => {
    setCity(location);
  };
  const selectedCityHandler = (e: any, value: any) => {
    props.setAddToFav(favorites.find((city: any) => value.Key === city.Key));
    props.cityData(value);
    dispatch(fetchCurrentWeather(value) as any);
    dispatch(fetchWeekWeather(value) as any);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }} style={{ color: '#fff' }}>
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
            label="Search for a City..."
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              style: {
                border: currentData.isDayTime ? 'none' : '1px solid #fff',
                color: currentData.isDayTime ? 'none' : '#fff',
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
