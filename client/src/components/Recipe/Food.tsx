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
const Food = ({ desc, info, like, refetch }: { desc: Recipe; info: User; like: Function; refetch: Function }) => {
  let { id = 0, contents = [], likes = [], title = "", materials = "" } = desc;
  materials = materials.slice(0, 80) + "...";

  let check = false;
  likes.map((el: object) => {
    if (Object.values(el).includes(info.id)) {
      check = true;
    }
  });

  return (
    <FoodsWrap>
      <FoodList>
        <FoodImg src={contents[0] ? contents[0]?.img : UndefinedImg} />
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
                await like({ variables: { recipeId: id, userId: info.id } });
                refetch();
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
