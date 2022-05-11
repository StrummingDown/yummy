import styled from "styled-components";
import { fontColorProps } from "../utils/typeDefs";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 35%;
  padding: 35px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 320px;
  }
`;

export const UserInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;
  @media (max-width: 768px) {
    width: 320px;
  }
`;

export const UserAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  object-fit: cover;
  margin: 30px 0px;
  margin-bottom: 8px;
`;

export const Introduce = styled.div`
  background-color: rgb(250, 242, 235);
  padding: 10px;
  margin: 20px;
  height: 180px;
  @media (max-width: 768px) {
    height: auto;
  }
`;
export const InputIntro = styled.input`
  background-color: rgb(250, 242, 235);
  padding: 10px;
  margin: 20px;
  height: 180px;
  @media (max-width: 768px) {
    height: auto;
  }
`;

export const ButtonBox = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserNick = styled.div``;
export const UserNickInput = styled.input``;
export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TitleWrap = styled.ul`
  display: flex;
  justify-content: space-around;
`;

export const Title = styled.li<fontColorProps>`
  color: ${(props) => (props.fontcolor ? "rgb(245, 132, 11);" : "black")};
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
`;
