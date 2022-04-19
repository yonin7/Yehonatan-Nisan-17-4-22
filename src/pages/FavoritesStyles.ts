import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 90vh;
`;
export const CardsContainer = styled.div`
  display: flex;
  margin: 5rem;
  min-height: 30vh;
  justify-content: space-between;
  align-items: space-between;
  gap: 5rem;
`;
export const Cards = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  border: 1px solid black;
`;
