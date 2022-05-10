import styled from "styled-components";
import Footer from "../components/Footer";
import { MainContent } from "../components/MainContent";

let imgSrc = [
  {
    bTitle: "오늘 뭐먹지?",
    sTitle: "먹고싶은 음식이 떠오르지 않을때",
    btn: "/recipelist",
    src: "https://cdn.discordapp.com/attachments/921262874356224000/973488019921321995/a68e89f029c29ede.webp",
  },
  {
    bTitle: "냉장고에 뭐있지?",
    sTitle: "냉장고 속 남은 재료로 만들고 싶을때",
    btn: "/search",
    src: "https://cdn.discordapp.com/attachments/921262874356224000/973487998987534346/6c7f536788e0371a.webp",
  },
];
const Main = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {imgSrc.map((el) => {
        return <MainContent adrs={el} />;
      })}
      <Footer />
    </div>
  );
};

export default Main;
