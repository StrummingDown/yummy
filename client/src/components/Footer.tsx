import {
  AboutUsBox,
  Contianer,
  Title,
  LinkBox,
  TeamMember,
  MemberInfoBox,
  Name,
  Role,
  Copyright,
} from "../styled/footer";

const Footer = () => {
  return (
    <Contianer>
      <AboutUsBox>
        <Title>ABOUT US</Title>
        <LinkBox href="https://github.com/StrummingDown/yummy" target="_blank">
          <i className="fab fa-github"></i>
        </LinkBox>
      </AboutUsBox>
      <TeamMember>
        <MemberInfoBox>
          <Name href="https://github.com/sophiecode1105" target="_blank">
            이채영
          </Name>
          <Role>FRONT-END</Role>
        </MemberInfoBox>
        <MemberInfoBox>
          <Name href="https://github.com/KongJin" target="_blank">
            진공
          </Name>
          <Role>BACK-END</Role>
        </MemberInfoBox>
        <MemberInfoBox>
          <Name href="https://github.com/StrummingDown" target="_blank">
            윤대규
          </Name>
          <Role>BACK-END</Role>
        </MemberInfoBox>
      </TeamMember>
      <Copyright>copyright © 2022 yummy all rights reserved</Copyright>
    </Contianer>
  );
};

export default Footer;
