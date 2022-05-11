import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";

const getToken: any = localStorage.getItem("recoil-persist");
let token = undefined;

if (getToken) {
  const parseToken = JSON.parse(getToken);
  token = parseToken.token ? parseToken.token : undefined;
}
//uri: "http://ec2-54-221-95-4.compute-1.amazonaws.com:4000/graphql",
const uploadLink = createUploadLink({
  uri: "http://ec2-54-221-95-4.compute-1.amazonaws.com:4000/graphql",
  credentials: "same-origin",
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink as any,
});
export default client;
