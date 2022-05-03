import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1400px;
  margin: 10px auto;
`;

export const MaterialListContainer = styled.div`
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 250px;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  padding: 10px;
`;

export const Material = styled.img`
  height: 100%;
  width: 100%;
  background-blend-mode: darken;
`;

type materialImg = {
  image: string;
  state: boolean;
};
export const MaterialName = styled.div<materialImg>`
  background-color: #0005;
  background-image: ${(props) => `url(${props.image})`};
  background-blend-mode: ${(props) => (props.state ? 'darken' : 'screen')};
  background-size: 100% 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  border-radius: 10px;

  :hover {
    background-blend-mode: screen;
    font-weight: bolder;
  }

  :active {
    background-blend-mode: screen;
    font-weight: bolder;
    color: black;
  }
`;

export const ButtonWrap = styled(Link)`
  all: unset;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50px;
  background-color: rgb(132, 173, 51);
  color: #fff;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
`;
