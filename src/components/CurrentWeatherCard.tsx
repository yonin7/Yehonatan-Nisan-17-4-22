import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Temperature,
  TemperatureContainer,
} from './CurrentWeatherCardStyles';

const CurrentWeatherCard: React.FC<{
  celsius: boolean;
  city: string;
}> = (props) => {
  const { currentData }: any = useSelector<{
    weather: { currentData: string[] };
  }>((state) => state.weather);

  const { weekData }: any = useSelector<{ weather: { weekData: string[] } }>(
    (state) => state.weather
  );
  const [degrees, setdegree] = useState(0);

  const { celsius } = props;
  // useEffect(() => {
  //   if (celsius) {
  //     setdegree(Math.round(currentData.Temperature?.Metric?.Value));
  //   } else {
  //     setdegree(currentData.Temperature?.Imperial?.Value);
  //   }
  // }, [celsius]);

  return (
    <Container>
      <div>
        <h4>{props.city}</h4>
        <p>{currentData.LocalObservationDateTime}</p>
        <img
          src={`/images/weathericons/${weekData.WeatherIcon}.svg`}
          style={{ width: '5rem', height: '5rem' }}
        />
        <h4>{currentData.WeatherText}</h4>
      </div>
      <TemperatureContainer>
        <Temperature>{degrees}</Temperature>
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
