import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { postLogin } from "../../graphql/query";
import { modal, signUp, social, token } from "../../utils/state";
import {
  AlertBox,
  Container,
  GoogleButton,
  KakaoButon,
  SocalLoginTitle,
  SocialButtonWrap,
  InTitle,
  ButtonWrap,
  InButton,
  SignInInput,
  SignInForm,
} from "../../styled/modal";

function Signin() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const setToken = useSetRecoilState(token);
  const setModal = useSetRecoilState(modal);
  const signUpClick = useSetRecoilState(signUp);
  const [errorMessage, setErrorMessage] = useState("");
  const [socialType, setSocialType] = useRecoilState(social);

  const handleInputValue = (key: any) => (e: any) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const nav = useNavigate();
  const url = new URL(window.location.href);
  const [check, setCheck] = useState(false);
  let code: string | null = url.searchParams.get("code") || null;

  let socialLogin = gql`
    query ($code: String!) {
      ${socialType}(code: $code)
    }
  `;
  let { refetch, loading } = useQuery(socialLogin); // 타입을 받아서 구글인지 카카오인지 여부 판단

  const getToken = async () => {
    return new Promise((resolve, reject) => {
      refetch({ code }).then((res) => {
        resolve(res.data);
      });
    });
  };

  const socialSign = async () => {
    const data: any = await getToken();

    setToken(data[socialType]);

    nav("/");
    window.location.reload();
  };

  if (code !== null && !check) {
    setCheck(true);
    socialSign();
  }

  let [postlogin] = useMutation(postLogin);

  const handleLogin = async () => {
    const { email, password } = loginInfo;
    if (Object.values(loginInfo).includes("")) {
      setErrorMessage("모든 항목을 입력해 주세요.");
      return;
    }

    const { data = { login: "" } } = await postlogin({
      variables: {
        email,
        password,
      },
    });

    if (data.login !== "") {
      setModal(false);
      setToken(data.login);
    }
    setLoginInfo({ email: "", password: "" });
    window.location.reload();
  };

  return (
    <>
      <Container>
        <SignInForm onSubmit={(e) => e.preventDefault()}>
          <InTitle>
            <h1>로그인</h1>
          </InTitle>
          <SignInInput
            type="email"
            placeholder="이메일"
            value={loginInfo.email}
            onChange={handleInputValue("email")}
          />
          <SignInInput
            type="password"
            placeholder="비밀번호"
            value={loginInfo.password}
            onChange={handleInputValue("password")}
          />
          <AlertBox className="alert-box">{errorMessage}</AlertBox>
          <SocalLoginTitle>SOCIAL LOGIN</SocalLoginTitle>
          <SocialButtonWrap>
            <KakaoButon
              onClick={() => setSocialType("kakao")}
              href="https://kauth.kakao.com/oauth/authorize?client_id=6e3631177cc7a53a44f92b73761b1af4&redirect_uri=http://yummyclient.s3-website-us-east-1.amazonaws.com&response_type=code"
            >
              kakao
            </KakaoButon>
            <GoogleButton
              onClick={() => setSocialType("google")}
              href="https://accounts.google.com/o/oauth2/v2/auth?client_id=786693724856-3b1fu2t449chp8q8d4bh7omg8k5f3cqu.apps.googleusercontent.com&redirect_uri=http://yummyclient.s3-website-us-east-1.amazonaws.com&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email"
            >
              google
            </GoogleButton>
          </SocialButtonWrap>
          <ButtonWrap>
            <InButton type="submit" onClick={handleLogin}>
              LOGIN
            </InButton>
            <InButton
              type="submit"
              onClick={() => {
                signUpClick(true);
              }}
            >
              SIGN UP
            </InButton>
          </ButtonWrap>
        </SignInForm>
      </Container>
    </>
  );
}

export default Signin;
