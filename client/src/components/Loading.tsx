import loadingImg from "../assets/loading.gif";

const Loading = () => {
  return (
    <div style={{ margin: "100px 0px" }}>
      <img src={loadingImg} alt="loading" />
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
