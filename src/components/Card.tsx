import { useState, useEffect } from 'react';
import { Container } from './CardStyles';
import pic from '../images/38.png';

const Card: React.FC<{
  celsius: boolean;
  day: string;
  dayTitle: string;
  nightTitle: string;
  img: string;
  backImg: string;
  Temperature: {
    Maximum: {
      Value: number;
      Unit: string;
    };
    Minimum: {
      Value: number;
      Unit: string;
    };
  };
}> = (props) => {
  const [minDegrees, setMinDegree] = useState(0);
  const [maxDegrees, setMaxDegree] = useState(0);

  const { celsius } = props;
  useEffect(() => {
    if (celsius) {
      setMinDegree(Math.round((props.Temperature.Minimum.Value - 32) * 0.5556));
      setMaxDegree(Math.round((props.Temperature.Maximum.Value - 32) * 0.5556));
    } else {
      setMinDegree(props.Temperature.Minimum.Value);
      setMaxDegree(props.Temperature.Maximum.Value);
    }
  }, [celsius]);

  return (
    <Container>
      <h5>{props.day}</h5>
      <img src={pic} style={{ width: '5rem', height: '5rem' }} />
      <span>
        {`${maxDegrees}`}-{`${minDegrees}`}
      </span>
    </Container>
  );
};

export default Card;

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
