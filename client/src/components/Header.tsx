import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useMediaQuery } from "react-responsive";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modal, sideModal, token } from "../utils/state";
import { Container, Div, LinkTag, Img, RightCon2, BurgerIcon, NavBar } from "../styled/header";
import { useEffect, useRef } from "react";

const Header = () => {
  const isPc = useMediaQuery({ query: "(min-width: 768px)" }, undefined);
  const modals = useSetRecoilState(modal);
  const [sides, setSides] = useRecoilState(sideModal);
  const [tokens, setToken] = useRecoilState(token);
  const trace = useRef();
  const goto = useNavigate();
  const handleClickOutside = ({ target }: MouseEvent) => {
    if (sides && trace?.current !== target) {
      setSides(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });

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
              <Div
                onClick={() => {
                  setToken(undefined);
                  goto("/");
                }}
              >
                로그아웃
              </Div>
            </>
          ) : (
            <Div onClick={() => modals((prev: boolean) => !prev)}>로그인</Div>
          )}
        </RightCon2>
      ) : (
        <RightCon2>
          <BurgerIcon onClick={() => setSides(!sides)} className="fas fa-bars" />
          <NavBar ref={trace} sides={sides}>
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
          </NavBar>
        </RightCon2>
      )}
    </Container>
  );
};

export default Header;
