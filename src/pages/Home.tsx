import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import { allData, AppDispatch } from '../store';

import Card from '../components/Card';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import SearchInput from '../components/SearchInput';
import { fetchCurrentWeather, fetchWeekWeather } from '../store/actions';
import { MainWrapper, CardWrapper, WeekCardWrapper } from './HomeStyles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormGroup from '@mui/material/FormGroup';
import { weatherActions } from '../store/slices/weather';
import { dayGifs, nigthGifs } from '../consts/urls';
import { ICity, IFavoriteCity, IWeekDay } from '../interfaces/weather';
import SwitchButton from '../components/SwitchButton';

interface ILocation {
  state: {
    city: ICity;
  };
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const location: ILocation = useLocation();
  const { weekData, currentData, favorites } = useSelector(allData);
  const [mainImg, setMainImg] = useState('');
  const cityImg =
    'https://images.jpost.com/image/upload/f_auto,fl_lossy/t_JM_ArticleMainImageFaceDetect/453218';

  const [weatherImg, setWeatherImg] = useState(
    'https://64.media.tumblr.com/5a49546c22cc7dc5eeda64f34c8ee16b/tumblr_nlka5wXM4a1srpztwo1_500.gifv'
  );
  const [cityData, setCityData] = useState({} as ICity);
    
    
  const { state } = location;
  useEffect(() => {
    if (state) {
      dispatch(fetchCurrentWeather(state.city));
      dispatch(fetchWeekWeather(state.city));
    }
  }, [state, dispatch]);

  // console.log(weekData[0]);
  useEffect(() => {
    let displayDay 
    weekData[0]?.Night? displayDay=weekData[0]?.Night : displayDay=currentData.WeatherIcon
    if (currentData.IsDayTime) {
      weekData[0]?.Day? displayDay=weekData[0]?.Day : displayDay=currentData.WeatherIcon
      setMainImg(
        'https://authenticallydel.com/wp-content/uploads/2021/06/100-things-to-do-on-a-rainy-day-1024x576.jpg'
      );
      if (currentData.WeatherIcon > 0 && (currentData.WeatherIcon < 4)) {
        setWeatherImg(dayGifs.sunny);
        setMainImg(
          'https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Cheight=675%2Cmetadata=none%2Conerror=redirect%2Cq=85%2Cwidth=1200/wp-content/uploads/daylight-appreciation-day1-scaled.jpg'
        );
      }
      if ((currentData.WeatherIcon > 3 )&& (currentData.WeatherIcon < 8)) {
        setWeatherImg(dayGifs.clouds);
        setMainImg(
          'https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Cheight=675%2Cmetadata=none%2Conerror=redirect%2Cq=85%2Cwidth=1200/wp-content/uploads/daylight-appreciation-day1-scaled.jpg'
        );
      }
      if ((currentData.WeatherIcon >= 8)) {
        setWeatherImg(dayGifs.Rclouds);
      }
      if ((currentData.WeatherIcon > 11)) {
        setWeatherImg(dayGifs.fog);
      }
      if ((currentData.WeatherIcon > 11) && (currentData.WeatherIcon < 19)) {
        setWeatherImg(dayGifs.rainy);
      }
      if ((currentData.WeatherIcon > 18) && (currentData.WeatherIcon < 24)) {
        setWeatherImg(dayGifs.swon);
      }
      if ((currentData.WeatherIcon > 23)) {
        setWeatherImg(dayGifs.ice);
      }
    } else {
      setMainImg(
        'https://cdn.mos.cms.futurecdn.net/4ai74uN2hgWvcCsie7jxUo.jpg'
      );
      if ((currentData.WeatherIcon> 32) && (currentData.WeatherIcon < 36)) {
        setWeatherImg(nigthGifs.sunny);
      }
      if ((currentData.WeatherIcon > 35) && (currentData.WeatherIcon < 39)) {
        setWeatherImg(nigthGifs.clouds);
      }
      if ((currentData.WeatherIcon > 38) && (currentData.WeatherIcon < 41)) {
        setWeatherImg(nigthGifs.rainy);
      }
      if ((currentData.WeatherIcon > 40) && (currentData.WeatherIcon < 43)) {
        setWeatherImg(nigthGifs.storm);
      }
      if (currentData.WeatherIcon > 42) {
        setWeatherImg(nigthGifs.swon);
      }
    }
  }, [dispatch, currentData]);

  const [addToFav, setAddToFav] = useState(false);

  const favoriteToggleHandler = () => {
    setAddToFav(!addToFav);
    if (addToFav) {
      dispatch(weatherActions.removeFromFavorites(cityData));
    }
  };

  useEffect(() => {
    const cityInFavHandler = () => {
      const inFav = favorites.find(
        (city: IFavoriteCity) => cityData.Key === city.Key
      );
      console.log(inFav);

      if (addToFav && !inFav) {
        const favData = {
          Key: cityData.Key,
          LocalizedName: cityData.LocalizedName,
          temperature: currentData.Temperature.Metric.Value,
        };

        dispatch(weatherActions.addToFavorites(favData));
        return;
      } else if (!addToFav && inFav) {
        setAddToFav(true);
      }
    };
    cityInFavHandler();
  }, [addToFav, cityData, currentData, dispatch, favorites]);
  return (
    <MainWrapper main={mainImg}>
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
          <SearchInput cityData={setCityData} setAddToFav={setAddToFav} />
        </Grid>
      </Box>
      <CardWrapper weather={weatherImg} city={cityImg}>
        <div
          style={{
            width: '85%',
            display: 'flex',
            justifyContent: 'space-between',
            position: 'absolute',
            top: '1rem',
            zIndex: '2',
          }}
        >
          {addToFav ? (
            <FavoriteIcon onClick={favoriteToggleHandler} />
          ) : (
            <FavoriteBorderIcon onClick={favoriteToggleHandler} />
          )}
          <FormGroup sx={{ flexDirection: 'row' }}>
            <SwitchButton isDarkMode={false} />
          </FormGroup>
        </div>
        <CurrentWeatherCard
          city={state ? state.city.LocalizedName : cityData.LocalizedName}
        />

        <WeekCardWrapper>
          {weekData.map((city: IWeekDay, index: number) => {
            return <Card key={city.Link} id={index} />;
          })}
        </WeekCardWrapper>
      </CardWrapper>
    </MainWrapper>
  );
};

export default Home;
