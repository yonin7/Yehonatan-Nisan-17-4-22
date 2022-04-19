import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Temperature,
  TemperatureContainer,
} from './CurrentWeatherCardStyles';

const CurrentWeatherCard: React.FC<{
  celsius: boolean;
}> = (props) => {
  const { currentData }: any = useSelector<{
    weather: { currentData: string[] };
  }>((state) => state.weather);

  const { weekData }: any = useSelector<{ weather: { weekData: string[] } }>(
    (state) => state.weather
  );
  const [degrees, setdegree] = useState(0);
  const [minDegrees, setMinDegree] = useState(0);
  const [maxDegrees, setMaxDegree] = useState(0);

  const { celsius } = props;
  // useEffect(() => {
  //   if (celsius) {
  //     setdegree(Math.round(currentData.Temperature?.Metric?.Value));
  //     setMinDegree(
  //       Math.round((weekData[0].Temperature.Minimum.Value - 32) * 0.5556)
  //     );
  //     setMaxDegree(
  //       Math.round((weekData[0].Temperature.Maximum.Value - 32) * 0.5556)
  //     );
  //   } else {
  //     setdegree(currentData.Temperature?.Imperial?.Value);
  //     setMinDegree(weekData[0].Temperature.Minimum.Value);
  //     setMaxDegree(weekData[0].Temperature.Maximum.Value);
  //   }
  // }, [celsius]);

  return (
    <Container>
      <div>
        <h4>Tel Aviv</h4>
        <p>{currentData.LocalObservationDateTime}</p>
        <img
          src={`/images/weathericons/${weekData.WeatherIcon}.svg`}
          style={{ width: '5rem', height: '5rem' }}
        />
        <h4>{currentData.WeatherText}</h4>
      </div>
      <TemperatureContainer>
        <Temperature>{degrees}</Temperature>
        <p>{` ${maxDegrees}/${minDegrees}`}</p>
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
