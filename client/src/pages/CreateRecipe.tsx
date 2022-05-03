import { useState } from 'react';
import Content from '../components/CreateRecipe/Content';
import { content } from '../utils/typeDefs';
import { gql, useMutation } from '@apollo/client';
import RecipeTitle from '../components/CreateRecipe/RecipeTitle';
import { useRecoilValue } from 'recoil';
import { materialList, title } from '../state/state';
import Choice from '../components/CreateRecipe/Choice';
import { AddIcon, Container, ContentContainer, Label, OrderButton, RegisterButton } from '../styled/create';
import { Button } from '../styled/materialList';
import plus from '../assets/plus.png';

const postRecipe = gql`
  mutation ($info: createRecipe!) {
    createRecipe(info: $info) {
      id
      title
    }
  }
`;
const postContents = gql`
  mutation ($info: [inputContent]!, $recipeId: Int!) {
    createContent(info: $info, recipeId: $recipeId)
  }
`;

const CreateRecipe = () => {
  const [render, setRender] = useState(0);
  const recipeTitle = useRecoilValue(title);
  const material = useRecoilValue(materialList);
  const [prevImg] = useState<string[]>([plus]);

  const [inputContents] = useState<content[]>([{ img: '', explain: '' }]);

  const [recipe] = useMutation(postRecipe);
  const [content] = useMutation(postContents);

  const complete = async () => {
    console.log(material.join(' & '));
    const { data: RecipeData = { createRecipe: {} } } = await recipe({
      variables: {
        info: { title: recipeTitle, materials: material.join(' & ') },
      },
    });

    const { data: ContentsData = { createContent: {} } } = await content({
      variables: {
        info: inputContents,
        recipeId: RecipeData.createRecipe.id,
      },
    });

    console.log(ContentsData);
  };

  const add = () => {
    prevImg.push(plus);
    inputContents.push({ img: '', explain: '' });
    setRender(render + 1);
  };
  return (
    <Container>
      <Choice />
      <RecipeTitle />
      <ContentContainer>
        <Label>요리 순서</Label>
        {prevImg.map((img: string, idx: number) => {
          return <Content key={idx} idx={idx} inputContents={inputContents} prevImg={prevImg} />;
        })}
        <OrderButton onClick={add}>
          <AddIcon className="fas fa-plus-circle" />
          순서추가
        </OrderButton>
      </ContentContainer>
      <RegisterButton onClick={complete}>Complete</RegisterButton>
    </Container>
  );
};

export default CreateRecipe;
