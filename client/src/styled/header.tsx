import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  background-color: rgb(245, 132, 11);
  height: 70px;
  justify-content: space-between;
  align-items: center;
`;

export const RightCon2 = styled.div`
  display: flex;
  justify-content: space-around;
  margin-right: 20px;
  font-weight: bold;
`;

export const LinkTag = styled(Link)`
  margin: 0px 10px;
  color: black;
  text-decoration: none;
`;

export const Div = styled.div`
  padding: 0px 20px;
  cursor: pointer;
`;

export const Img = styled.img`
  margin: 5px;
  padding: 0px 10px;
  width: 10rem;
`;

export const BurgerIcon = styled.i`
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
`;
