import { useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, postLike, recipe } from "../graphql/query";
import { LikeCount, LikeWrap } from "../styled/recipeList";
import { useQuery, useMutation } from "@apollo/client";
import { ContentContainer, ContentImg, ContentText, DetailContainer } from "../styled/detail";
import Loading from "../components/Loading";
import { useSetRecoilState } from "recoil";
import { modal } from "../utils/state";

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

  let { contents = [], materials = "", title = "", likes = [], userId: writerId = 99999 } = data.getRecipe;

  let check = false;
  let userId: number | undefined = undefined;
  if (data.getUser) {
    let { id = 0 } = data.getUser;
    userId = id;
    likes.map((el: object) => {
      if (Object.values(el).includes(userId)) {
        check = true;
      }
    });
  }

  const [like] = useMutation(postLike);
  const [remove] = useMutation(deleteRecipe);
  const loginModal = useSetRecoilState(modal);
  const nav = useNavigate();

  console.log(writerId, userId);
  return (
    <DetailContainer>
      <div
        style={{
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <span style={{ fontSize: "40px", marginRight: "20px", marginBottom: "10px" }}>{title}</span>
          <LikeWrap
            onClick={async () => {
              if (userId) {
                await like({ variables: { recipeId: Number(id), userId } });
                refetch();
              } else {
                loginModal(true);
              }
            }}
          >
            {check ? <i className="fa-solid fa-heart" /> : <i className="far fa-heart" />}
            <LikeCount>{likes.length}</LikeCount>
          </LikeWrap>
          {writerId === userId && (
            <LikeWrap
              onClick={() => {
                remove({ variables: { id: Number(id) } });
                nav("/recipelist");
              }}
            >
              <i className="fa-solid fa-trash-can"></i>
            </LikeWrap>
          )}
        </div>
        <div style={{ fontSize: "20px", color: "gray", letterSpacing: "0.5px", lineHeight: "23px" }}>{materials}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}> {loading && <Loading />}</div>
      {contents.map((el: { explain: string; img: string }, idx: number) => {
        return (
          <ContentContainer key={idx}>
            <ContentImg src={el.img} />
            <ContentText>{el.explain}</ContentText>
          </ContentContainer>
        );
      })}
    </DetailContainer>
  );
};
export default Detail;
