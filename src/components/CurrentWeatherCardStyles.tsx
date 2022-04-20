import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid lightgray;
  max-height: 70%;

  font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, 'Lucida Grande', Arial,
    Ubuntu, Cantarell, 'Fira Sans', sans-serif;
  font-width: 100;
  line-height: 20px;
  font-size: 1.2rem;
  color: #fff;
  @media (max-width: 940px) {
    font-width: 200;
    line-height: 10px;
    font-size: 0.85rem;
  }
`;
export const DeatailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 940px) {
    font-width: 200;
    line-height: 10px;
    font-size: 0.85rem;
  }
`;
export const TemperatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 940px) {
    font-width: 200;
    line-height: 10px;
    font-size: 2rem;
  }
`;
export const Temperatures = styled.h4`
  font-width: 100;
  font-size: 8rem;
  margin: 0;
  padding: 3rem 0;
  @media (max-width: 940px) {
    font-width: 200;
    line-height: 10px;
    font-size: 3.5rem;
  }
`;
