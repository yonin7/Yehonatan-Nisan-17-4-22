import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import SearchInput from '../components/SearchInput';

import { MainWrapper, CardWrapper, WeekCardWrapper } from './HomeStyles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { weatherActions } from '../store/slices/weather';

const Home = () => {
  const dispatch = useDispatch();

  const { weekData }: any = useSelector<{ weather: { weekData: string[] } }>(
    (state) => state.weather
  );
  const { currentData }: any = useSelector<{
    weather: { currentData: string[] };
  }>((state) => state.weather);

  const [cityImg, setCityImg] = useState(
    'https://images.jpost.com/image/upload/f_auto,fl_lossy/t_JM_ArticleMainImageFaceDetect/453218'
  );
  const [weatherImg, setWeatherImg] = useState(
    'https://64.media.tumblr.com/5a49546c22cc7dc5eeda64f34c8ee16b/tumblr_nlka5wXM4a1srpztwo1_500.gifv'
  );
  const [isNight, setIsNight] = useState(true);
  const [cityData, setCityData] = useState({} as any);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 4 && hour > 20) setIsNight(true);
    else setIsNight(false);
  }, [weekData]);

  // useEffect(() => {
  //   if (isNight) {
  //     const status = weekData[0].Night.IconPhrase;
  //     if (status.includes('Cloudy' || 'cloudy')) {
  //       setWeatherImg('https://j.gifs.com/vQJxxY.gif');
  //     } else if (status.includes('Rainy')) {
  //       setWeatherImg(
  //         'https://64.media.tumblr.com/5a49546c22cc7dc5eeda64f34c8ee16b/tumblr_nlka5wXM4a1srpztwo1_500.gifv'
  //       );
  //     }
  //   } else {
  //     const status = weekData[0].Day.IconPhrase;
  //     if (status.includes('Cloudy' || 'cloudy')) {
  //       setWeatherImg('https://j.gifs.com/vQJxxY.gif');
  //     } else if (status.includes('Rainy')) {
  //       setWeatherImg(
  //         'hhttps://64.media.tumblr.com/5a49546c22cc7dc5eeda64f34c8ee16b/tumblr_nlka5wXM4a1srpztwo1_500.gifv'
  //       );
  //     }
  //   }
  // }, [isNight, weekData]);

  const { favorites }: any = useSelector<{ weather: { favorites: string[] } }>(
    (state) => state.weather
  );

  const [addToFav, setAddToFav] = useState(
    favorites.find((city: any) => city.id === cityData.Key)
  );
  const cityDataHandler = (data: any) => {
    console.log(data);

    setCityData(data);
  };

  const favoriteHandler = () => {
    setAddToFav(!addToFav);
    console.log(cityData);

    const favData = {
      id: cityData.Key,
      name: cityData.LocalizedName,
      temperature: currentData.Temperature.Metric.Value,
    };
    if (!addToFav) {
      dispatch(weatherActions.addToFavorites(favData) as any);
      return;
    }
    dispatch(weatherActions.removeFromFavorites(favData) as any);
  };
  return (
    <MainWrapper>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          width: '100%',
          height: '5vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <Grid
          container
          style={{ position: 'relative', width: '90%', maxWidth: '53rem' }}
        >
          <SearchInput setAddToFav={setAddToFav} cityData={cityDataHandler} />
        </Grid>
      </Box>

      <CardWrapper weather={weatherImg} city={cityImg}>
        {addToFav ? (
          <FavoriteIcon
            onClick={favoriteHandler}
            sx={{ position: 'absolute', zIndex: '2' }}
          />
        ) : (
          <FavoriteBorderIcon onClick={favoriteHandler} />
        )}
        <CurrentWeatherCard celsius={true} city={cityData.LocalizedName} />
        <WeekCardWrapper>
          {weekData.map((city: any) => (
            <Card
              celsius={true}
              key={city.EpochDate}
              day={city.Date}
              dayTitle={city.Day.IconPhrase}
              nightTitle={city.Night.IconPhrase}
              img={city.WeatherIcon}
              backImg={city.backImg}
              Temperature={city.Temperature}
            />
          ))}
        </WeekCardWrapper>
      </CardWrapper>
    </MainWrapper>
  );
};

export default Home;
