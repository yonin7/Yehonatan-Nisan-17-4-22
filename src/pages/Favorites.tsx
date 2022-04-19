import { useSelector, useDispatch } from 'react-redux';
import FavoritesCard from '../components/FavoritesCard';
import { MainWrapper, CardsContainer, Cards } from './FavoritesStyles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { weatherActions } from '../store/slices/weather';

const Favorites = () => {
  const dispatch = useDispatch();

  const { favorites }: any = useSelector<{ weather: { favorites: string[] } }>(
    (state) => state.weather
  );
  console.log(favorites);

  const favoriteHandler = (data: any) => {
    dispatch(weatherActions.removeFromFavorites(data) as any);
  };
  return (
    <MainWrapper>
      <CardsContainer>
        {favorites.map((city: any) => (
          <Cards>
            <FavoriteIcon
              onClick={() => favoriteHandler(city)}
              sx={{ position: 'absolute', top: '10px', left: '10px' }}
            />
            <FavoritesCard
              key={city.id}
              id={city.id}
              city={city.name}
              temperature={city.temperature}
            />
          </Cards>
        ))}
      </CardsContainer>
    </MainWrapper>
  );
};

export default Favorites;
