import { useRecoilValue } from "recoil";
import { allMaterials } from "../../utils/state";
import { ChoiceContainer, Label, List, ListWrap, SelectContent, Wrap } from "../../styled/create";

const Choice = ({ materials, setMaterials }: { materials: string[]; setMaterials: Function }) => {
  const getAllMaterails = useRecoilValue(allMaterials);

  return (
    <Wrap>
      <Label>재료</Label>
      <ChoiceContainer>
        <ListWrap>
          {getAllMaterails.map((material, i) => {
            return (
              <List
                key={i}
                clicked={materials.includes(material)}
                onClick={() => {
                  if (!materials.includes(material)) {
                    setMaterials([...materials, material]);
                  } else {
                    setMaterials(
                      materials.filter((el) => {
                        return el !== material;
                      })
                    );
                  }
                }}
              >
                {material}
              </List>
            );
          })}
        </ListWrap>
        <SelectContent>{`선택한재료: ${materials}`}</SelectContent>
      </ChoiceContainer>
    </Wrap>
  );
};

export default Choice;
