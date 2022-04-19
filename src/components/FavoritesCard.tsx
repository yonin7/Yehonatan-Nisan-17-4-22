import { useState, useEffect } from 'react';
import { Container } from './FavoritesCardStyles';

const FavoritesCard: React.FC<{
  LocalizedName: string;
  Key: string;
  temperature: number;
}> = (props) => {
  return (
    <Container>
      <h5>{props.LocalizedName}</h5>
      <h6>{props.Key}</h6>
      <h6>{props.temperature}</h6>
    </Container>
  );
};

export default FavoritesCard;
