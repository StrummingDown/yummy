import { useQuery } from "@apollo/client";
import MyList from "../components/Mypage/MyList";
import Profile from "../components/Mypage/Profile";
import { getUser } from "../graphql/query";

const Mypage = () => {
  const { loading, data = { getUser: {} }, error, refetch } = useQuery(getUser);

  return (
    <>
      <Profile userdata={data.getUser} refetch={refetch} />
      <MyList getUser={data.getUser} refetch={refetch} />
    </>
  );
};

export default Mypage;
