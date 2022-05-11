import { useState } from "react";
import { TitleWrap, Title } from "../../styled/mypage";
import Food from "../Recipe/Food";
import { useMutation } from "@apollo/client";
import { postLike } from "../../graphql/query";
import Loading from "../Loading";
import { User } from "../../utils/typeDefs";

const MyList = ({ getUser, refetch }: { getUser: User; refetch: Function }) => {
  let { likes = [], recipes = [] } = getUser;

  const TitleList = ["Likes", "My Recipes"];

  const [focusedTitle, setFocusedTitle] = useState<string>("Likes");

  const [like] = useMutation(postLike);
  const clickEffect = (title: string) => {
    setFocusedTitle(title);
  };

  return (
    <>
      <TitleWrap>
        {TitleList.map((title, i) => {
          return (
            <Title
              key={i}
              fontcolor={title === focusedTitle}
              onClick={() => {
                clickEffect(title);
              }}
            >
              {title}
            </Title>
          );
        })}
      </TitleWrap>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {!getUser.email && <Loading />}

        {(focusedTitle === "Likes" ? likes : recipes).map((el: any, i: number) => {
          return (
            <Food
              desc={focusedTitle === "Likes" ? el["recipe"] : el}
              info={getUser}
              like={like}
              key={i}
              refetch={refetch}
            />
          );
        })}
      </div>
    </>
  );
};

export default MyList;
