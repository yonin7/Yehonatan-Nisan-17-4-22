import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import FavoritesCard from '../components/FavoritesCard';
import { MainWrapper, CardsContainer, Cards } from './FavoritesStyles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { weatherActions } from '../store/slices/weather';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { favorites }: any = useSelector<{ weather: { favorites: string[] } }>(
    (state) => state.weather
  );
  console.log(favorites);

  // const favoriteHandler = (data: any) => {
  //   dispatch(weatherActions.removeFromFavorites(data) as any);
  // };

  const openCardHandler = (city: any) => {
    history.push('/', { city });
  };
  return (
    <MainWrapper>
      <CardsContainer>
        {favorites.map((city: any) => (
          <Cards onClick={() => openCardHandler(city)}>
            {/* <FavoriteIcon
              onClick={() => favoriteHandler(city)}
              sx={{ position: 'absolute', top: '10px', left: '10px' }}
            /> */}
            <FavoritesCard
              key={city.id}
              Key={city.Key}
              LocalizedName={city.LocalizedName}
              temperature={city.temperature}
            />
          </Cards>
        ))}
      </CardsContainer>
    </MainWrapper>
  );
};

export default Favorites;
