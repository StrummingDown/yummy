import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const recipe = gql`
  query ($id: Int!) {
    getRecipe(id: $id) {
      title
      materials
      contents {
        explain
        img
      }
      likes {
        userId
      }
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const {
    data = { getRecipe: {} },
    loading,
    error,
  } = useQuery(recipe, {
    variables: { id: Number(id) },
  });

  let { contents = [], materials = "", title = "", likes = [] } = data.getRecipe;

  return (
    <div>
      {contents.map((el: { explain: string; img: string }, idx: number) => {
        return (
          <div key={idx}>
            <img src={el.img} width="300px" />
            <div>{el.explain}</div>
          </div>
        );
      })}
    </div>
  );
};
export default Detail;
