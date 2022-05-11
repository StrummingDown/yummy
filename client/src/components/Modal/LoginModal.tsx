import { useRecoilState } from "recoil";
import { modal, signUp } from "../../utils/state";
import { CloseButton, Icon, ModalBackdrop, ModalContainer, ModalView } from "../../styled/modal";
import Signin from "./Signin";
import Signup from "./Signup";

const LoginModal = () => {
  const [modalValues, setModal] = useRecoilState(modal);
  const [signUpState, setSignUpState] = useRecoilState(signUp);

  const test = () => {
    setModal(!modalValues);
    setSignUpState(false);
  };

  return (
    <ModalContainer modals={modalValues}>
      <ModalBackdrop>
        <ModalView>
          <CloseButton>
            <Icon onClick={test} className="fa-solid fa-xmark"></Icon>
          </CloseButton>
          {signUpState ? <Signup /> : <Signin />}
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
};

export default LoginModal;
