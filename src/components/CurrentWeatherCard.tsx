import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { allData, AppDispatch } from '../store';

import { fetchCurrentWeather, fetchWeekWeather } from '../store/actions';
import {
  Container,
  Temperatures,
  TemperatureContainer,
  DeatailsContainer,
} from './CurrentWeatherCardStyles';

import Skeleton from '@mui/material/Skeleton';

const CurrentWeatherCard: React.FC<{
  city: string;
}> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { currentData, isCelsius, loading } = useSelector(allData);
  const [temperatureDegrees, setTemperatureDegrees] = useState(0);
  const [displayedDate, setDisplayedDate] = useState('');

  const { Temperature } = currentData;

  useEffect(() => {
    const defaultCity = { LocalizedName: 'Tel Aviv', Key: '215854' };
    dispatch(fetchCurrentWeather(defaultCity));
    dispatch(fetchWeekWeather(defaultCity));
  }, [dispatch]);

  useEffect(() => {
    if (isCelsius) {
      setTemperatureDegrees(Math.round(Temperature?.Metric?.Value));
    } else {
      setTemperatureDegrees(Math.round(Temperature?.Imperial?.Value));
    }
  }, [isCelsius, Temperature, dispatch]);
  useEffect(()=>{
    let convertedDate = currentData.LocalObservationDateTime.split('T')[0].split('-')
    const newDate = `${convertedDate[2]}/${convertedDate[1]}/${convertedDate[0]}`
    setDisplayedDate(newDate)
  },[currentData])


  const img =
    currentData.WeatherIcon < 9
      ? `0${currentData.WeatherIcon}`
      : currentData.WeatherIcon;

  return (
    <Container>
      {loading ? (
        <Skeleton
          sx={{ bgcolor: '#ffffff2c', borderRadius: '1rem' }}
          width={1000}
          variant="rectangular"
          height={500}
          animation="wave"
        />
      ) : (
        <>
          <DeatailsContainer>
            <h4>{props.city ? props.city : 'Tel Aviv'}</h4>
            <p>{displayedDate}</p>
            {!img ? null : (
              <img
                src={`https://developer.accuweather.com/sites/default/files/${img}-s.png`}
                alt="weather icon"
                style={{ width: '13rem', height: '8rem' }}
              />
            )}
            <h4>{currentData.WeatherText ? currentData.WeatherText : null}</h4>
          </DeatailsContainer>
          <TemperatureContainer>
            <Temperatures>
              {temperatureDegrees ? temperatureDegrees : 0}
            </Temperatures>
          </TemperatureContainer>
        </>
      )}
    </Container>
  );
};

export default CurrentWeatherCard;
