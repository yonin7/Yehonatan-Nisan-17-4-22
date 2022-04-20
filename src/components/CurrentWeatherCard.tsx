import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { allData } from '../store';

import { fetchCurrentWeather, fetchWeekWeather } from '../store/actions';
import {
  Container,
  Temperatures,
  TemperatureContainer,
  DeatailsContainer,
} from './CurrentWeatherCardStyles';

const CurrentWeatherCard: React.FC<{
  city: string;
}> = (props) => {
  const dispatch = useDispatch();

  const { currentData, isCelsius } = useSelector(allData);
  const [temperatureDegrees, setTemperatureDegrees] = useState(0);

  const { Temperature } = currentData;

  useEffect(() => {
    const defaultCity = { LocalizedName: 'Tel Aviv', Key: '215854' };
    dispatch(fetchCurrentWeather(defaultCity) as any);
    dispatch(fetchWeekWeather(defaultCity) as any);
    if (isCelsius) {
      setTemperatureDegrees(Math.round(Temperature?.Metric?.Value));
    } else {
      setTemperatureDegrees(Math.round(Temperature?.Imperial?.Value));
    }
  }, []);

  useEffect(() => {
    if (isCelsius) {
      setTemperatureDegrees(Math.round(Temperature?.Metric?.Value));
    } else {
      setTemperatureDegrees(Math.round(Temperature?.Imperial?.Value));
    }
  }, [isCelsius, Temperature, dispatch]);

  const img =
    parseInt(currentData.WeatherIcon) < 9
      ? `0${currentData.WeatherIcon}`
      : currentData.WeatherIcon;

  return (
    <Container>
      <DeatailsContainer>
        <h4>{props.city ? props.city : 'Tel Aviv'}</h4>
        <p>{currentData.LocalObservationDateTime}</p>
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
    </Container>
  );
};

export default CurrentWeatherCard;
