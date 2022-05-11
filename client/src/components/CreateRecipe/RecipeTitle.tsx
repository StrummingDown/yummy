import { useSetRecoilState } from "recoil";
import { title } from "../../utils/state";
import { Input, Label, Wrap } from "../../styled/create";

const RecipeTitle = () => {
  const setTitle = useSetRecoilState(title);

  return (
    <Wrap>
      <Label>레시피 제목</Label>
      <Input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="예: 소고기 미역국 끓이기"
      />
    </Wrap>
  );
};

export default RecipeTitle;
