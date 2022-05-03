import styled from 'styled-components';
import { Modal } from '../utils/typeDefs';

export const ModalContainer = styled.div<Modal>`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.modals ? 'block' : 'none')};
  /* border: 10px solid red; */
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* backdrop-filter: blur(4px); */
`;

export const ModalView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 360px;
  background-color: white;
  border-radius: 10px;
  height: 432px;
  z-index: 10;
`;

export const CloseButton = styled.div`
  font-size: 15px;
  justify-content: flex-end;
  display: flex;
  width: 100%;
  cursor: pointer;
  z-index: 9999;
`;
export const Icon = styled.i`
  padding: 10px;
`;

export const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  padding: 20px;
  border-radius: 5px;
`;

export const SignInInput = styled.input`
  all: unset;
  border-bottom: 2px solid grey;
  margin: 10px;
`;

export const ImgLabel = styled.label`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 100%;
  width: 120px;
  height: 120px;
  margin: 30px 0px;
  &:hover {
    div {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.4);
      color: white;
    }
  }
`;

export const UserAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;
export const UpText = styled.div`
  position: absolute;
  opacity: 0;
  width: 120px;
  height: 120px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentImgLabel = styled.label`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 150px;
  height: 150px;
  margin: 30px 0px;
  background-color: rgb(250, 242, 235);
  color: grey;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const ImgFile = styled.input`
  text-decoration: none;
  width: 120px;
  height: 120px;
  top: 0;
  left: 0;
  position: absolute;
  font-size: 100;
  opacity: 0;
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const InTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 0px 0px 20px 0px;
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AlertBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;
  color: red;
`;

const btn = styled.button`
  background-color: rgb(132, 173, 51);
  color: #fff;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
`;
export const InButton = styled(btn)`
  width: 200px;
  height: 25px;
  margin: 10px 25px;
  cursor: pointer;
`;

export const Button = styled(btn)`
  margin-left: 8px;
`;

export const SocalLoginTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SocialButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5px 0px;
  width: 80%;
`;

export const SocialButton = styled.a`
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
`;

export const GoogleButton = styled(SocialButton)`
  background-color: #dd4b39;
`;

export const KakaoButon = styled(SocialButton)`
  background-color: rgb(247, 230, 0);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px auto;
`;

export const Label = styled.label`
  margin-right: 8px;
`;

export const WelcomeImg = styled.img`
  width: 4rem;
`;

type ErrorProps = {
  error?: string | undefined;
};

export const Input = styled.input`
  all: unset;
  border-bottom: 2px solid grey;
  width: 200px;
  margin-right: 40px;
`;

export const SendButton = styled(Button)`
  position: absolute;
  width: 60px;
  height: 20px;
  top: -2px;
  right: -30px;
`;

export const NextButton = styled(Button)`
  width: 70px;
  height: 25px;
`;

export const SignUpButton = styled(NextButton)`
  margin: 20px 0px;
`;

export const Errorbox = styled.div`
  color: red;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 12px;
`;
