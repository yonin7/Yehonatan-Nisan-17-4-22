import { useDispatch } from 'react-redux';

const Card: React.FC<{
  day: string;
  title: string;
  img: string;
  backImg: string;
  degrees: number;
}> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        border: '1px solid black',
        width: '10rem',
        height: '15rem',
      }}
    >
      <h2>{props.day}</h2>
      <div>
        <img src={props.img} style={{ width: '5rem', height: '5rem' }} />
        <span>{props.degrees}c</span>
      </div>
      <h4>{props.title}</h4>
    </div>
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
