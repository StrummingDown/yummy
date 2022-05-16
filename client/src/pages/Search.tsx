import { ButtonWrap, Container, MaterialListContainer, Button } from "../styled/materialList";
import { materialList } from "../utils/state";
import { useSetRecoilState } from "recoil";
import Material from "../components/Search/Material";
import { material } from "../utils/typeDefs";
import { useQuery } from "@apollo/react-hooks";
import { Get_Materials } from "../graphql/query";

const Search = () => {
  const setMaterialList = useSetRecoilState(materialList);
  let { loading, data, error } = useQuery(Get_Materials);
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
