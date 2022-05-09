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
const Food = ({ desc, info, ddd, like }: any) => {
  let { id = 0, contents = [], likes = [], title = "", user = {}, materials = "" } = desc;
  materials = materials.slice(0, 80) + "...";

  let check = false;
  likes.map((el: { __typename: string; userId: number }) => {
    if (Object.values(el).includes(info.id)) {
      check = true;
    }
  });
  console.log(contents[0]?.img);

  return (
    <FoodsWrap>
      <FoodList>
        <FoodImg src={contents[0] ? contents[0]?.img : UndefinedImg} />
        <Desc>
          <FoodDesc to={String(id)}>
            <FoodName>{title}</FoodName>
            <FoodMaterials>{materials}</FoodMaterials>
          </FoodDesc>
          <SubDesc>
            <UserDesc>
              <UserAvatar src={UndefinedImg} />
              <UserNickname>{user.nickName}</UserNickname>
            </UserDesc>
            <LikeWrap
              onClick={async () => {
                await like({ variables: { recipeId: id, userId: info.id } });
                ddd((prev: number) => prev + 1);
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
