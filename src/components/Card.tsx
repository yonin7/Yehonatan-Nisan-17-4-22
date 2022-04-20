import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { allData } from '../store';
import { Container } from './CardStyles';

const Card: React.FC<{ id: number }> = (props) => {
  const { weekData, currentData, isCelsius } = useSelector(allData);
  const [minDegrees, setMinDegree] = useState(0);
  const [maxDegrees, setMaxDegree] = useState(0);

  useEffect(() => {
    if (isCelsius) {
      setMinDegree(
        Math.round((weekData[props.id].Temperature.Minimum.Value - 32) * 0.5556)
      );
      setMaxDegree(
        Math.round((weekData[props.id].Temperature.Maximum.Value - 32) * 0.5556)
      );
    } else {
      setMinDegree(weekData[props.id].Temperature.Minimum.Value);
      setMaxDegree(weekData[props.id].Temperature.Maximum.Value);
    }
  }, [isCelsius, weekData, setMaxDegree, setMinDegree, props]);

  let img =
    parseInt(weekData[props.id].Night.Icon) < 9
      ? `0${weekData[props.id].Night.Icon}`
      : weekData[props.id].Night.Icon;
  if (currentData.IsDayTime) {
    img =
      parseInt(weekData[props.id].Day.Icon) < 9
        ? `0${weekData[props.id].Day.Icon}`
        : weekData[props.id].Day.Icon;
  }

  return (
    <Container>
      <h5>{weekData[props.id].Date}</h5>
      <img
        src={`https://developer.accuweather.com/sites/default/files/${img}-s.png`}
        alt="weather icon"
        style={{ width: '8rem', height: '5rem' }}
      />
      <span>
        {`${maxDegrees}`}-{`${minDegrees}`}
      </span>
    </Container>
  );
};

export default Card;
