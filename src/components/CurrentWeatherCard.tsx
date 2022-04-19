import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentWeather, fetchWeekWeather } from '../store/actions';
import {
  Container,
  Temperature,
  TemperatureContainer,
} from './CurrentWeatherCardStyles';

const CurrentWeatherCard: React.FC<{
  city: string;
}> = (props) => {
  const dispatch = useDispatch();

  const { currentData }: any = useSelector<{
    weather: { currentData: string[] };
  }>((state) => state.weather);

  const { isCelsius }: any = useSelector<{
    weather: { isCelsius: boolean };
  }>((state) => state.weather);

  console.log(isCelsius);

  const { weekData }: any = useSelector<{ weather: { weekData: string[] } }>(
    (state) => state.weather
  );
  const [cityName, setdegree] = useState(0);

  // const { celsius } = props;
  useEffect(() => {
    const defaultCity = { LocalizedName: 'Tel Aviv', Key: '215854' };
    dispatch(fetchCurrentWeather(defaultCity) as any);
    dispatch(fetchWeekWeather(defaultCity) as any);
  }, []);

  return (
    <Container>
      <div>
        <h4>{props.city ? props.city : 'Tel Aviv'}</h4>
        <p>{currentData.LocalObservationDateTime}</p>
        <img
          src={`/images/weathericons/${weekData.WeatherIcon}.svg`}
          style={{ width: '5rem', height: '5rem' }}
        />
        <h4>{currentData.WeatherText}</h4>
      </div>
      <TemperatureContainer>
        <Temperature>
          {isCelsius
            ? Math.round(currentData.Temperature?.Metric?.Value)
            : Math.round(currentData.Temperature?.Imperial?.Value)}
        </Temperature>
      </TemperatureContainer>
    </Container>
  );
};

export default CurrentWeatherCard;

// import { useDispatch } from 'react-redux';

// const Card: React.FC<{
//   title: string;
//   img: string;
//   backImg: string;
//   degrees: number;
// }> = (props) => {
//   return (
//     <div>
//       <h3>{props.day}</h3>
//       <div>
//         <img src={props.img} />
//         <span>{props.degrees}c</span>
//       </div>
//       <h3>{props.title}</h3>
//     </div>
//   );
// };

// export default Card;
