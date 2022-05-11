import { MaterialName } from "../../styled/materialList";
import { material } from "../../utils/typeDefs";
import { useState } from "react";

const Material = ({ el, listAdd }: { el: material; listAdd: Function }) => {
  const [state, setState] = useState(true);

  return (
    <MaterialName
      key={el.id}
      image={el.img}
      onClick={() => {
        setState(!state);
        listAdd(el.name);
      }}
      state={state}
    >
      {el.name}
    </MaterialName>
  );
};

export default Material;
