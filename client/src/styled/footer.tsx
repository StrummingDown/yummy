import styled from "styled-components";

export const Contianer = styled.div`
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 250px;
`;

export const AboutUsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

export const LinkBox = styled.a`
  text-decoration: none;
  i {
    font-size: 24px;
    color: black;
  }
`;

export const Title = styled.div`
  margin-bottom: 10px;
`;

export const TeamMember = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MemberInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
export const Name = styled.a`
  margin-bottom: 5px;
  text-decoration: none;
  color: black;
`;

export const Role = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
`;

export const Copyright = styled.div`
  margin: 10px;
  font-size: 13px;
`;
