import { Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { allData } from '../store';
import { Container } from './CardStyles';

const Card: React.FC<{ id: number }> = (props) => {
  const { weekData, currentData, isCelsius, loading } = useSelector(allData);
  const [minDegrees, setMinDegree] = useState(0);
  const [maxDegrees, setMaxDegree] = useState(0);
  const [displayedDate, setDisplayedDate] = useState('');

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
  useEffect(()=>{
    let convertedDate = weekData[props.id].Date.split('T')[0].split('-')
    const newDate = `${convertedDate[2]}/${convertedDate[1]}/${convertedDate[0]}`
    setDisplayedDate(newDate)
  },[weekData,props])
  let img =
    weekData[props.id].Night.Icon < 9
      ? `0${weekData[props.id].Night.Icon}`
      : weekData[props.id].Night.Icon;
  if (currentData.IsDayTime) {
    img =
      weekData[props.id].Day.Icon < 9
        ? `0${weekData[props.id].Day.Icon}`
        : weekData[props.id].Day.Icon;
  }

  return (
    <Container>
      {loading ? (
        <Skeleton
          sx={{ bgcolor: '#ffffff2c', borderRadius: '1rem' }}
          width={150}
          variant="rectangular"
          height={200}
          animation="wave"
        />
      ) : (
        <>
          <h5>{displayedDate?displayedDate: weekData[props.id].Date}</h5>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${img}-s.png`}
            alt="weather icon"
            style={{ width: '8rem', height: '5rem' }}
          />
          <span>
            {`${maxDegrees}`}-{`${minDegrees}`}
          </span>
        </>
      )}
    </Container>
  );
};

export default Card;
