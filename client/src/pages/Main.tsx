import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Footer from "../components/Footer";
import { MainContent } from "../components/MainContent";
import { Get_Materials } from "../graphql/query";
import { allMaterials } from "../utils/state";

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
  const setAllMaterails = useSetRecoilState(allMaterials);
  let { loading, data, error } = useQuery(Get_Materials);
  useEffect(() => {
    const allList = data?.getAllMaterial.map((material: { name: string }) => {
      return material.name;
    });

    setAllMaterails(allList);
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {imgSrc.map((el, i) => {
        return <MainContent adrs={el} key={i} />;
      })}
      <Footer />
    </div>
  );
};

export default Main;
