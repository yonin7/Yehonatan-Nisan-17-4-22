import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 90vh;
  background-image: url(https://stunningmotivation.com/wp-content/uploads/2019/07/seasons-of-life.jpg)};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media (max-width: 740px) {
    background-image: url(https://www.practiceportuguese.com/wp-content/uploads/2017/03/Seasons-of-the-Year.jpg)};
    height: 100%;
    background-repeat: repeat;
  }
`;
export const CardsContainer = styled.div`
  display: flex;
  margin: 5rem;
  min-height: 30vh;
  justify-content: flex-start;
  align-items: space-between;
  gap: 5rem;
  flex-wrap: wrap;
  @media (max-width: 740px) {
    flex-direction: column;
    font-size: 0.75rem;
    height: 100%;
    margin: 0;
    margin-top: 2rem;
    flex-wrap: nowrap;
  }
`;
export const Cards = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 1.3rem;
  color: black;
  background-color: rgba(236, 236, 236, 0.9);
`;
