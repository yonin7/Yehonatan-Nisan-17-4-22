import styled from 'styled-components';

type mainProps = {
  main: string;
};
type cardProps = {
  weather: string;
  city: string;
};

export const MainWrapper = styled.div<mainProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  &:before {
    background-image: ${(props) => `url(${props.main})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    z-index: -10;
  }

  @media (max-width: 940px) {
    height: 100%;
    margin-top: 3.5rem; 
    &:before {
      height: 100%;
      background-image: none;
    }
  }
  @media (max-height: 868px) {
    margin-top: 3.5rem; 
    height: 100%;
    width: 95%;
  }
`;
export const CardWrapper = styled.div<cardProps>`
  display: flex;
  flex-direction: column;
  margin: 2rem; 
  position: relative;
  justify-content: space-between;
  align-items: space-between;
  border-radius: 1.5rem; 
  padding: 2.5rem;
  max-height: 70vh;
  overflow: hidden;

  &:before {
    content: '';
    opacity: 0.8;
    filter: blur(7px);
    background-image: ${(props) => `url(${props.city})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  &:after {
    content: '';
    opacity: 0.3;
    background-image: ${(props) => `url(${props.weather})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  @media (max-width: 940px) {
    font-size: 0.75rem; 
    max-height: 100%;
    width: 75%;
    margin: 0;
    margin-top: 2rem;
  }
  @media (max-height: 868px) {
    margin-top: 3.5rem; 
    max-height: 100%;
  }
`;
export const WeekCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 40%;
  color: #fff;
  @media (max-width: 940px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
