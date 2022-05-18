import { materialList } from "../utils/state";
import { Container, HatImg, Title, KnifeImg, TitleWrapper } from "../styled/recipeList";
import Tag from "../components/Recipe/Tag";
import chefHat from "../assets/chefHat.png";
import kitchenKinfe from "../assets/kitchenKnife.png";
import Food from "../components/Recipe/Food";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useRecoilValue } from "recoil";
import { useEffect, useRef, useState } from "react";
import { Get_FoodList, postLike } from "../graphql/query";
import Loading from "../components/Loading";
import { Recipe } from "../utils/typeDefs";

const HTML: any = document.querySelector("html");
const RecipeList = () => {
  const searchMaterails = useRecoilValue(materialList);
  const [list, setList] = useState<any>([]);
  const [pageCnt, setPageCnt] = useState(0);
  const loadingState = useRef(false);
  const scrollReady: any = useRef(false);

  let [
    getList,
    {
      loading,
      data = { searchRecipe: { recipeList: [] }, getUser: {} }, //data가 undefined => 이후에 채워짐 , type을 맞추고 undefined일때 타입을 맞추기위한 처리
      error,
    },
  ] = useLazyQuery(Get_FoodList);

  const [like] = useMutation(postLike);

  const infiniteScroll = () => {
    const currentScrollTop = HTML?.scrollTop; // 현재 스크롤 위치
    const windowInner = window.innerHeight; // 브라우저의 스크롤 높이
    const fullHeight = HTML?.scrollHeight; // HTML의 높이

    if (currentScrollTop + windowInner >= fullHeight && scrollReady.current) {
      setPageCnt((prev) => prev + 1);
    }
  };

  const getData = async () => {
    loadingState.current = true;
    const { data } = await getList({
      variables: { materialName: searchMaterails, page: pageCnt },
    });
    setList([...list, ...data.searchRecipe.recipeList]);
    if (data.searchRecipe.recipeList.length !== 0) {
      scrollReady.current = true;
    } else {
      scrollReady.current = false;
    }
    loadingState.current = false;
  };

  const getData2 = async () => {
    loadingState.current = true;
    setPageCnt(0);

    const { data } = await getList({
      variables: { materialName: searchMaterails, page: 0 },
    });
    setList(data.searchRecipe.recipeList);
    if (data.searchRecipe.recipeList.length !== 0) {
      scrollReady.current = true;
    } else {
      scrollReady.current = false;
    }
    loadingState.current = false;
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    !loadingState.current && getData2();
  }, [searchMaterails]);

  useEffect(() => {
    !loadingState.current && getData();
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [pageCnt]);

  return (
    <Container>
      <HatImg src={chefHat} />
      <TitleWrapper>
        <Title>내가 선택한 재료 </Title>
        <KnifeImg src={kitchenKinfe} />
      </TitleWrapper>
      <Tag />
      {list.map((el: Recipe, i: string) => {
        return <Food like={like} refetch={getData2} info={data.getUser} desc={el} key={i} />;
      })}
      {loadingState.current && scrollReady.current && loading && <Loading />}
    </Container>
  );
};
// 로딩이 안나오는 조건
// !loadingState.current
//

export default RecipeList;
