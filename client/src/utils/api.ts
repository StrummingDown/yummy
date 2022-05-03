import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation Join($text: {
  email: String,
  password: String,
  img: String,
  nickname: String
}) {
    joinUser(info: $text) {
      id
      text
    }
  }
`;
