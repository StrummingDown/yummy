import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { allMaterials, materialList } from "../../state/state";
import {
  Icon,
  SearchResult,
  SearchResultWrap,
  TagInput,
  TagList,
  TagsContainer,
  TagTitle,
  TagWrap,
} from "../../styled/recipeList";

const Tag = () => {
  const insideRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useRecoilState<string[]>(materialList);
  const [isfocused, setIsfocused] = useState<boolean>(false);
  const getAllMaterails = useRecoilValue(allMaterials);
  const [searchText, setSearchText] = useState("");

  const handleClickOutside = ({ target }: any) => {
    if (isfocused && !insideRef?.current?.contains(target)) {
      setIsfocused(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });

  const addTags = (event: React.FormEvent<HTMLSelectElement>) => {
    if ((event.target as HTMLInputElement).value !== "") {
      if (!getAllMaterails.includes((event.target as HTMLInputElement).value)) {
        alert("재료를 정확하게 입력해주세요");
      } else if (tags.includes((event.target as HTMLInputElement).value)) {
        alert("이미 추가된 재료입니다");
        (event.target as HTMLInputElement).value = "";
      } else {
        setTags([...tags, (event.target as HTMLInputElement).value]);
        (event.target as HTMLInputElement).value = "";
        setSearchText("");
      }
    }
  };

  const removeTags = (indexToRemove: number) => {
    setTags(tags.filter((tag) => indexToRemove !== tags.indexOf(tag)));
  };

  return (
    <TagsContainer
      ref={insideRef}
      onFocus={() => {
        setIsfocused(!isfocused);
      }}
    >
      <TagWrap>
        {tags.map((tag, index: number) => {
          return (
            <TagList key={index}>
              <TagTitle>
                {tag}
                <span>
                  <Icon className="fas fa-times" onClick={() => removeTags(index)} />
                </span>
              </TagTitle>
            </TagList>
          );
        })}
      </TagWrap>
      <TagInput
        type="text"
        placeholder="재료를 입력해주세요"
        onKeyUp={(event: any) => (event.key === "Enter" ? addTags(event) : "")}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {isfocused ? (
        <SearchResultWrap>
          {getAllMaterails.map((material, i) => {
            if (material.startsWith(searchText))
              return (
                <SearchResult
                  key={i}
                  onClick={() => {
                    if (!tags.includes(material)) {
                      setTags([...tags, material]);
                      setIsfocused(false);
                    } else {
                      alert("이미포함했심");
                    }
                  }}
                >
                  {material}
                </SearchResult>
              );
          })}
        </SearchResultWrap>
      ) : null}
    </TagsContainer>
  );
};

export default Tag;
