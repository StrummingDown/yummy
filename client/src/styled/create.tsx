import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { clickedProps } from '../utils/typeDefs';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(237, 237, 239);
  align-items: cener;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(237, 237, 239);
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 30px;
  background-color: white;
  margin: 10px 30px;
`;

export const ContentWrap = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 300px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const OrderNum = styled.div`
  margin-right: 10ex;
  color: rgb(245, 132, 11);
  font-weight: bold;
`;

export const ChoiceContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid rgb(132, 173, 51);
  width: 500px;
  margin: 30px auto;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 250px;
  }
`;

export const ListWrap = styled.ul`
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 10px;
`;

export const SelectContent = styled.div`
  margin: 0px 10px 15px 10px;
`;

export const List = styled.li<clickedProps>`
  width: auto;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  padding: 0 8px;
  font-size: 14px;
  list-style: none;
  border: 1px solid black;
  background-color: ${(props) => (props.clicked ? 'rgb(178, 219, 95);' : '#fff')};
  border-radius: 6px;
  margin: 0 8px 8px 0;
  cursor: pointer;
  &:hover {
    background-color: rgb(178, 219, 95);
  }
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px;
  background-color: white;
  margin: 10px 30px;
`;

export const Label = styled.label`
  margin-right: 20px;
  font-weight: bold;
  font-size: 18px;
`;

export const Inputwrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  margin: 30px 0px 10px 0px;
  width: 400px;
  padding: 10px;
  font-size: 15px;
  border: none;
  background-color: rgb(250, 242, 235);

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 250px;
  }
`;

export const ContentInput = styled.textarea`
  height: 150px;
  background-color: rgb(250, 242, 235);
  resize: none;
  width: 400px;
  padding: 10px;
  border: none;
  &:focus {
    outline: none;
  }
  margin-right: 3px;

  @media (max-width: 768px) {
    @media (max-width: 768px) {
      width: 150px;
      height: 100px;
    }
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 30px;
  width: 100%;
`;

export const AddIcon = styled.i`
  color: rgb(245, 132, 11);
  margin-right: 10px;
`;
export const OrderButton = styled.button`
  all: unset;
  margin: 0 auto;
  cursor: pointer;
`;

export const RegisterButton = styled.button`
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
  margin: 30px auto;
`;
