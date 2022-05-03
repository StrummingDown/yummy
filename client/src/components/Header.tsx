import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modal, token } from "../state/state";
import { Container, Div, LinkTag, Img, RightCon2 } from "../styled/header";

const Header = () => {
  const modals = useSetRecoilState(modal);
  const [tokens, setToken] = useRecoilState(token);
  console.log(tokens);
  return (
    <Container>
      <Link to="/">
        {" "}
        <Img src={logo} />
      </Link>

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
    </Container>
  );
};

export default Header;
