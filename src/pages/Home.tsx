import { useSelector } from 'react-redux';
import Card from '../components/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

// import IconButton from '@material-ui/core/IconButton';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
}));

const Home = () => {
  const data: any = useSelector<{ weather: { data: string[] } }>(
    (state) => state.weather
  );

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          width: '100%',
          height: '35vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container style={{ position: 'relative', width: '30rem' }}>
          <TextField
            id="outlined-basic"
            label="Search for a city"
            variant="outlined"
            fullWidth
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Grid>
      </Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '5rem',
          gap: '5rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {data.data.map((a: any) => (
          <Card
            key={a.id}
            day={a.day}
            title={a.title}
            img={a.img}
            backImg={a.backImg}
            degrees={a.degrees}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
