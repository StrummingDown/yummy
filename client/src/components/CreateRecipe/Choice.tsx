import { useRecoilValue } from "recoil";
import { allMaterials } from "../../state/state";
import styled from "styled-components";
import { useState } from "react";
import { ChoiceContainer, List, ListWrap, SelectContent } from "../../styled/create";

const Choice = () => {
  const [materials, setMaterials] = useState<string[]>([]);
  const getAllMaterails = useRecoilValue(allMaterials);
  console.log(materials);

  return (
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
  );
};

export default Choice;