import { ButtonWrap, Container, MaterialListContainer, Button } from "../styled/materialList";
import { useQuery } from "@apollo/client";
import { allMaterials, materialList } from "../utils/state";
import { useSetRecoilState } from "recoil";
import Material from "../components/Search/Material";
import { useEffect } from "react";
import { material } from "../utils/typeDefs";
import { Get_Materials } from "../graphql/query";

const Search = () => {
  let { loading, data, error } = useQuery(Get_Materials);

  const setMaterialList = useSetRecoilState(materialList);
  const setAllMaterails = useSetRecoilState(allMaterials);

  useEffect(() => {
    const allList = data?.getAllMaterial.map((material: { name: string }) => {
      return material.name;
    });

    setAllMaterails(allList);
  });

  let list: string[] = [];

  const listAdd = (materialName: string) => {
    console.log(list);
    let index = list.indexOf(materialName);
    if (index === -1) {
      list.push(materialName);
    } else {
      list.splice(index, 1);
    }
  };

  return (
    <Container>
      <MaterialListContainer>
        {data?.getAllMaterial.map((el: material) => {
          return <Material key={el.id} el={el} listAdd={listAdd} />;
        })}
      </MaterialListContainer>
      <ButtonWrap to="/recipelist">
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            setMaterialList(list);
          }}
        >
          Find Recipe
        </Button>
      </ButtonWrap>
    </Container>
  );
};
export default Search;
