import { useNavigate } from "react-router-dom";

export const MainContent = ({ adrs }: { adrs: any }) => {
  const nav = useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", margin: "30px 0px" }}>
      <div style={{ marginTop: "50px" }}>
        <div style={{ fontSize: "30px" }}>{adrs.bTitle}</div>
        <div style={{ fontSize: "20px", margin: "30px 0px" }}>{adrs.sTitle}</div>
        <button onClick={() => nav(adrs.btn)}> 시작 하기 </button>
      </div>
      <img style={{ width: "70%", maxWidth: "550px" }} src={adrs.src} />
    </div>
  );
};
