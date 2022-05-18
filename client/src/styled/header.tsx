import styled from "styled-components";
import { Link } from "react-router-dom";

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

type NavAtrribute = {
  ref: any;
  sides: boolean;
};

export const NavBar = styled.div<NavAtrribute>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  top: 70px;
  width: 30%;
  z-index: 50;
  background-color: rgb(245, 132, 11);
  opacity: 0.8;
  visibility: ${({ sides }) => (sides ? "visible" : "hidden")};
`;

export const LinkTag = styled(Link)`
  margin: 0px 10px;
  color: black;
  text-decoration: none;
  /* margin-bottom: 15px; */
  padding: 15px 0px;
`;

export const Div = styled.div`
  padding: 0px 20px;
  cursor: pointer;
  padding: 15px 0px;
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
