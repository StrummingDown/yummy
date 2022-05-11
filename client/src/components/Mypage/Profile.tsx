import { useMutation } from "@apollo/client";
import { useState } from "react";
import { updateUser } from "../../graphql/query";
import { Button } from "../../styled/materialList";
import { ImgFile, ImgLabel, UpText } from "../../styled/modal";
import {
  ButtonBox,
  Container,
  InputIntro,
  Introduce,
  UserAvatar,
  UserInfoBox,
  UserNick,
  UserNickInput,
  Wrap,
} from "../../styled/mypage";

const Profile = ({
  userdata,
  refetch,
}: {
  userdata: { id: number; email: string; nickName: string; img: string; intro: string; likes: []; recipes: [] };
  refetch: Function;
}) => {
  let { id = 99999, email = "", nickName = "", img = "", intro = "", likes = [], recipes = [] } = userdata;

  const [check, setCheck] = useState(false);
  const [currentIntro, setCurrentIntro] = useState(intro);
  const [avatarImg, setAvatarImg] = useState<string | undefined>(img);
  const [update] = useMutation(updateUser);
  const [currentImg, setCurrentImg] = useState<File | undefined>();
  const [nick, setNick] = useState<string | undefined>();
  const previewFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      setAvatarImg(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container>
      <UserInfoBox>
        <ImgLabel htmlFor="input_file" check={check}>
          <UpText>
            이미지 <br />
            업로드
          </UpText>
          <UserAvatar
            src={
              avatarImg !== ""
                ? avatarImg
                : "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg"
            }
          />
          {check && (
            <ImgFile
              id="input_file"
              type="file"
              accept="*"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const target = event.target as HTMLInputElement;
                if (target.files) {
                  const file = target.files[0];
                  setCurrentImg(file);
                  return previewFile(file);
                }
              }}
            />
          )}
          {check ? (
            <UserNickInput
              onChange={(e) => {
                setNick(e.target.value);
              }}
            />
          ) : (
            <UserNick>{nickName}</UserNick>
          )}
        </ImgLabel>

        {check ? (
          <InputIntro onChange={(e) => setCurrentIntro(e.target.value)} />
        ) : (
          <Introduce>{intro === null ? "자기소개를 작성해주세요." : intro}</Introduce>
        )}
      </UserInfoBox>
      <ButtonBox>
        <Button
          onClick={async () => {
            if (check) {
              await update({ variables: { info: { id: id, img: currentImg, intro: currentIntro, nickName: nick } } });
              refetch();
            }

            setCheck((prev) => !prev);
          }}
        >
          {check ? "Complete" : "Modify"}
        </Button>
      </ButtonBox>
    </Container>
  );
};

export default Profile;
