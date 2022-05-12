import { useQuery } from "@apollo/client";
import MyList from "../components/Mypage/MyList";
import Profile from "../components/Mypage/Profile";
import { getUser } from "../graphql/query";

const Test = () => {
  const { loading, data = { getUser: {} }, error, refetch } = useQuery(getUser);

  console.log(loading);

  return (
    <>
      <Profile userdata={data.getUser} refetch={refetch} />
      <MyList getUser={data.getUser} refetch={refetch} />
    </>
  );
};

export default Test;
