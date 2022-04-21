import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { allData } from '../store';

import FavoritesCard from '../components/FavoritesCard';
import { MainWrapper, CardsContainer, Cards } from './FavoritesStyles';
import { IFavoriteCity } from '../interfaces/weather';

const Favorites = () => {
  const history = useHistory();
  const { favorites } = useSelector(allData);
  const openCardHandler = (city: IFavoriteCity) => {
    history.push('/', { city });
  };
  const defaultCity = { LocalizedName: 'Tel Aviv', Key: '215854' };

  return (
    <MainWrapper>
      <CardsContainer>
        {favorites.map((city: IFavoriteCity) => {
          return (
            <Cards
              key={city.Key ? city.LocalizedName : defaultCity.Key}
              onClick={() => openCardHandler(city)}
            >
              <FavoritesCard
                Key={city.Key ? city.Key : defaultCity.Key}
                LocalizedName={
                  city.LocalizedName
                    ? city.LocalizedName
                    : defaultCity.LocalizedName
                }
                temperature={city.temperature}
              />
            </Cards>
          );
        })}
      </CardsContainer>
    </MainWrapper>
  );
};

export default Favorites;
