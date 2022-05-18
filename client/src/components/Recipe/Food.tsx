import {
  Desc,
  FoodDesc,
  FoodImg,
  FoodList,
  FoodMaterials,
  FoodName,
  FoodsWrap,
  LikeCount,
  LikeWrap,
  SubDesc,
  UserAvatar,
  UserDesc,
  UserNickname,
} from "../../styled/recipeList";
import UndefinedImg from "../../assets/noImg.png";
import { Recipe, User } from "../../utils/typeDefs";
import { useSetRecoilState } from "recoil";
import { modal } from "../../utils/state";
const Food = ({ desc, info, like, refetch }: { desc: Recipe; info: User; like: Function; refetch: Function }) => {
  let { id = 0, contents = [{ img: "" }], likes = [], title = "", materials = "" } = desc;
  materials = materials.slice(0, 80) + "...";

  const loginModal = useSetRecoilState(modal);
  let check = false;

  if (info !== null) {
    likes.map((el: object) => {
      if (Object.values(el).includes(info.id)) {
        check = true;
      }
    });
  }

  return (
    <FoodsWrap>
      <FoodList>
        <FoodImg src={contents[contents.length - 1].img || contents[0].img || UndefinedImg} />
        <Desc>
          <FoodDesc to={`/recipelist/${String(id)}`}>
            <FoodName>{title}</FoodName>
            <FoodMaterials>{materials}</FoodMaterials>
          </FoodDesc>
          <SubDesc>
            <UserDesc>
              <UserAvatar src={desc.user.img} />
              <UserNickname>{desc.user.nickName}</UserNickname>
            </UserDesc>
            <LikeWrap
              onClick={async () => {
                if (info?.id) {
                  await like({ variables: { recipeId: id, userId: info.id } });
                  refetch();
                } else {
                  loginModal(true);
                }
              }}
            >
              {check ? <i className="fa-solid fa-heart" /> : <i className="far fa-heart" />}

              <LikeCount>{likes.length}</LikeCount>
            </LikeWrap>
          </SubDesc>
        </Desc>
      </FoodList>
    </FoodsWrap>
  );
};

export default Food;
