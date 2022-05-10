import { useParams } from "react-router-dom";
import { deleteRecipe, postLike, recipe } from "../graphql/query";
import { LikeCount, LikeWrap } from "../styled/recipeList";
import { useQuery, useMutation } from "@apollo/client";
import { ContentContainer, ContentImg, ContentText, DetailContainer } from "../styled/detail";
import Loading from "../components/Loading";

const Detail = () => {
  const { id } = useParams();
  const {
    data = { getRecipe: {}, getUser: {} },
    loading,
    error,
    refetch,
  } = useQuery(recipe, {
    variables: { id: Number(id) },
  });

  let {
    contents = [],
    materials = "",
    title = "",
    likes = [],
    userId: writerId = 0,
  } = data.getRecipe;

  let { id: userId = 0 } = data.getUser;
  let check = false;

  likes.map((el: { __typename: string; userId: number }) => {
    if (Object.values(el).includes(userId)) {
      check = true;
    }
  });

  const [like] = useMutation(postLike);
  const [remove] = useMutation(deleteRecipe);

  return (
    <DetailContainer>
      <LikeWrap
        onClick={async () => {
          await like({ variables: { recipeId: Number(id), userId } });
          refetch();
        }}
      >
        {check ? <i className="fa-solid fa-heart" /> : <i className="far fa-heart" />}
        <LikeCount>{likes.length}</LikeCount>
      </LikeWrap>
      {writerId === userId && (
        <LikeWrap>
          <i className="fa-solid fa-trash-can"></i>
        </LikeWrap>
      )}
      {loading && <Loading />}

      {contents.map((el: { explain: string; img: string }, idx: number) => {
        return (
          <ContentContainer key={idx}>
            <ContentImg src={el.img} width="300px" />
            <ContentText>{el.explain}</ContentText>
          </ContentContainer>
        );
      })}
    </DetailContainer>
  );
};
export default Detail;
