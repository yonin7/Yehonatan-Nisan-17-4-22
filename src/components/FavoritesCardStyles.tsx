import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 15rem;
  max-width: 100%;
  height: 100%;
  font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, 'Lucida Grande', Arial,
    Ubuntu, Cantarell, 'Fira Sans', sans-serif;
  font-width: 400;
  line-height: 20px;
  font-size: 1.3rem;
  color: black;

  @media (max-width: 740px) {
    width: 10rem;
  }
`;
