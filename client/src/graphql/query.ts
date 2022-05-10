import { gql } from "@apollo/client";

export const Get_Materials = gql`
  query {
    getAllMaterial {
      id
      name
      img
    }
  }
`;

export const postLogin = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const Certify = gql`
  mutation ($email: String!) {
    emailCertify(email: $email)
  }
`;

export const Join = gql`
  mutation ($info: createUser!) {
    joinUser(info: $info) {
      id
      email
      nickName
      img
    }
  }
`;

export const postRecipe = gql`
  mutation ($info: createRecipe!) {
    createRecipe(info: $info) {
      id
      title
    }
  }
`;
export const postContents = gql`
  mutation ($info: [inputContent]!, $recipeId: Int!) {
    createContent(info: $info, recipeId: $recipeId)
  }
`;

export const recipe = gql`
  query ($id: Int!) {
    getRecipe(id: $id) {
      title
      materials
      contents {
        explain
        img
      }
      likes {
        userId
      }
    }
    getUser {
      id
      email
      nickName
    }
  }
`;

export const getUser = gql`
  query {
    getUser {
      id
      email
      nickName
      img
      intro
      recipes {
        id
        title
        materials
        user {
          img
          nickName
        }
        contents {
          img
        }
        likes {
          userId
        }
      }
      likes {
        recipe {
          id
          title
          materials
          user {
            img
            nickName
          }
          likes {
            userId
          }
          contents {
            img
          }
        }
      }
    }
  }
`;

export const Get_FoodList = gql`
  query ($materialName: [String]!, $page: Int!) {
    searchRecipe(materialName: $materialName, page: $page) {
      recipeList {
        id
        title
        materials
        likes {
          userId
        }
        user {
          nickName
          img
        }
        contents {
          img
        }
      }
    }
    getUser {
      id
      email
      nickName
    }
  }
`;

export const postLike = gql`
  mutation ($recipeId: Int!, $userId: Int!) {
    Like(recipeId: $recipeId, userId: $userId) {
      id
    }
  }
`;
