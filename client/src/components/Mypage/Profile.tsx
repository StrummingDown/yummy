import { useMutation } from "@apollo/client";
import { updateUser } from "../../graphql/query";
import { Button } from "../../styled/materialList";
import { ButtonBox, Container, Introduce, UserAvatar, UserInfoBox, UserNick, Wrap } from "../../styled/mypage";

const Profile = ({
  userdata,
}: {
  userdata: { email: string; nickName: string; img: string; intro: string; likes: []; recipes: [] };
}) => {
  let { email = "", nickName = "", img = "", intro = "", likes = [], recipes = [] } = userdata;

  const [update] = useMutation(updateUser);
  return (
    <Container>
      <UserInfoBox>
        <Wrap>
          <UserAvatar src="https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg" />
          <UserNick>{nickName}</UserNick>
        </Wrap>
        <Introduce>{intro === null ? "자기소개를 작성해주세요." : intro}</Introduce>
      </UserInfoBox>
      <ButtonBox>
        <Button
          onClick={() => {
            update({ variables: { info: { img: "", intro: "" } } });
          }}
        >
          Modify
        </Button>
      </ButtonBox>
    </Container>
  );
};

export default Profile;
