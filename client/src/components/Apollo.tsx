import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";

const getToken: string | null = localStorage.getItem("recoil-persist");
let token = undefined;

if (getToken) {
  token = JSON.parse(getToken).token || "";
}
//uri: "http://ec2-54-221-95-4.compute-1.amazonaws.com:4000/graphql",
const uploadLink = createUploadLink({
  uri: "http://ec2-54-221-95-4.compute-1.amazonaws.com:4000/graphql",
  credentials: "same-origin",
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink as any,
});
export default client;
