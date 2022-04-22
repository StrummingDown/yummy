import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { signUp } from "../state/state";
import {
  AlertBox,
  Container,
  GoogleButton,
  KakaoButon,
  SigninContainer,
  SocalLoginTitle,
  SocialButtonWrap,
  Text,
  InTitle,
  InInputWrap,
  ButtonWrap,
  InButton,
} from "../styled/modal";

function Signin() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const signUpClick = useSetRecoilState(signUp);
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputValue = (key: any) => (e: any) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const login = (email: String, password: String) => {};

  const handleLogin = async () => {
    const { email, password } = loginInfo;

    if (Object.values(loginInfo).includes("")) {
      setErrorMessage("모든 항목을 입력해 주세요.");
      return;
    }
  };

  const closeModal = () => {};

  return (
    <>
      <Container>
        <SigninContainer>
          <form onSubmit={(e) => e.preventDefault()}>
            <InTitle>
              <h1 className="text-grey-600 underline">Sign In</h1>
            </InTitle>
            <InInputWrap>
              <Text>이메일</Text>
              <input type="email" placeholder="이메일" onChange={handleInputValue("email")} />
            </InInputWrap>
            <InInputWrap>
              <Text>비밀번호</Text>
              <input
                type="password"
                placeholder="비밀번호"
                onChange={handleInputValue("password")}
              />
            </InInputWrap>

            <SocalLoginTitle>Social Login</SocalLoginTitle>

            <SocialButtonWrap>
              <KakaoButon>kakao</KakaoButon>
              <GoogleButton>google</GoogleButton>
            </SocialButtonWrap>

            <ButtonWrap>
              <InButton type="submit" onClick={handleLogin}>
                Login
              </InButton>
              <InButton
                type="submit"
                onClick={() => {
                  signUpClick(true);
                }}
              >
                Sign Up!
              </InButton>
            </ButtonWrap>
            <AlertBox className="alert-box">{errorMessage}</AlertBox>
          </form>
        </SigninContainer>
      </Container>
    </>
  );
}

export default Signin;
