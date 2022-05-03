import { gql, useQuery } from "@apollo/client";

const getUser = gql`
  query {
    getUser {
      email
      nickName
      img
      intro
      recipes {
        id
        title
      }
      likes {
        id
        recipe {
          title
        }
      }
    }
  }
`;

const Mypage = () => {
  const { loading, data, error } = useQuery(getUser);

  console.log(error?.message);

  return <div>Mypage</div>;
};

export default Mypage;
