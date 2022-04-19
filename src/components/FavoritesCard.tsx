import { useState, useEffect } from 'react';
import { Container } from './FavoritesCardStyles';

const FavoritesCard: React.FC<{
  city: string;
  id: string;
  temperature: number;
}> = (props) => {
  return (
    <Container>
      <h5>{props.city}</h5>
      <h6>{props.id}</h6>
      <h6>{props.temperature}</h6>
    </Container>
  );
};

export default FavoritesCard;
