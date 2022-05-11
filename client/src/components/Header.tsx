import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useMediaQuery } from "react-responsive";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modal, sideModal, token } from "../utils/state";
import { Container, Div, LinkTag, Img, RightCon2, BurgerIcon } from "../styled/header";

const Header = () => {
  const isPc = useMediaQuery({ query: "(min-width: 768px)" }, undefined);
  const modals = useSetRecoilState(modal);
  const [sides, setSides] = useRecoilState(sideModal);
  const [tokens, setToken] = useRecoilState(token);
  return (
    <Container>
      <Link to="/">
        <Img src={logo} />
      </Link>
      {isPc ? (
        <RightCon2>
          <LinkTag to="/search">레시피 찾기</LinkTag>
          {tokens ? (
            <>
              <LinkTag to="/createRecipe">레시피 작성</LinkTag>
              <LinkTag to="/mypage">마이페이지</LinkTag>
              <Div onClick={() => setToken(undefined)}>로그아웃</Div>
            </>
          ) : (
            <Div onClick={() => modals((prev: boolean) => !prev)}>로그인</Div>
          )}
        </RightCon2>
      ) : (
        <RightCon2>
          <BurgerIcon onClick={() => setSides(!sides)} className="fas fa-bars" />
        </RightCon2>
      )}
    </Container>
  );
};

export default Header;
