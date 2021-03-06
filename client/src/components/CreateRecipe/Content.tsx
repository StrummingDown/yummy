import { useState } from "react";
import { content } from "../../utils/typeDefs";
import { ContentInput, ContentWrap, Inputwrap, OrderNum } from "../../styled/create";
import { Avatar, ContentImgLabel, ImgFile } from "../../styled/modal";

const Content = ({
  idx,
  inputContents,
  prevImg,
}: {
  idx: number;
  inputContents: content[];
  prevImg: string[];
}) => {
  const [render, setRender] = useState(0);

  const previewFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      prevImg[idx] = String(reader.result);
      setRender(render + 1);
    };

    reader.readAsDataURL(file);
  };

  return (
    <ContentWrap>
      <OrderNum>STEP {idx + 1}</OrderNum>
      <Inputwrap>
        <ContentInput
          onChange={(e) => {
            inputContents[idx].explain = e.target.value;
          }}
        />
        <ContentImgLabel htmlFor="input_file">
          <Avatar src={prevImg[idx]} />
          <ImgFile
            id="input_file"
            type="file"
            accept="*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const target = event.target as HTMLInputElement;
              if (target.files) {
                const file = target.files[0];

                inputContents[idx].img = file;
                return previewFile(file);
              }
            }}
          />
        </ContentImgLabel>
      </Inputwrap>
    </ContentWrap>
  );
};

export default Content;
