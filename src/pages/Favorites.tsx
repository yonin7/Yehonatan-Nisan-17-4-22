import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';
import { MainWrapper, CardsContainer, Cards } from './FavoritesStyles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { weatherActions } from '../store/slices/weather';

const Favorites = () => {
  const dispatch = useDispatch();

  const { favorites }: any = useSelector<{ weather: { favorites: string[] } }>(
    (state) => state.weather
  );

  const favoriteHandler = () => {
    dispatch(weatherActions.removeFromFavorites(favorites[0]) as any);
  };
  return (
    <MainWrapper>
      <CardsContainer>
        {favorites.map((city: any) => (
          <Cards>
            <FavoriteIcon
              onClick={favoriteHandler}
              sx={{ position: 'absolute', top: 0, left: 0 }}
            />
            <Card
              celsius={false}
              key={city.EpochDate}
              day={city.Date}
              dayTitle={city.Day.IconPhrase}
              nightTitle={city.Night.IconPhrase}
              img={city.WeatherIcon}
              backImg={city.backImg}
              Temperature={city.Temperature}
            />
          </Cards>
        ))}
      </CardsContainer>
    </MainWrapper>
  );
};

export default Favorites;
