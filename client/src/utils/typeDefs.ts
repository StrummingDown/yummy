export type joinInfo = {
  email: string;
  password: string;
};

export type material = {
  id: number;
  name: string;
  img: string;
};

export interface Modal {
  modals: boolean;
}
export type content = {
  img: File | string;
  explain: string;
};

export type clickedProps = {
  clicked: boolean;
};

export type FormData = {
  email: string;
  certifyNumber: number;
  password: string;
  password2: string;
  nickName: string;
};

export interface fontColorProps {
  fontcolor: boolean;
}

export type check = {
  check: boolean;
};

export type Recipe = {
  id: number;
  title: string;
  userId: number;
  user: User;
  likes: Like[];
  materials: string;
  contents: Content[];
};
export type User = {
  id: number;
  email: string;
  password: string;
  nickName: string;
  img: string;
  intro: string;
  recipes: Recipe[];
  likes: Like[];
};
export type Content = {
  id: number;
  img: string;
  explain: string;
  recipeId: number;
  recipe: Recipe;
};

export type Like = {
  id: number;
  userId: number;
  user: User;
  recipeId: number;
  recipe: Recipe;
};
