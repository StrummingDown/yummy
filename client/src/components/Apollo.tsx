import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";

const getToken: string | null = localStorage.getItem("recoil-persist");
let token = undefined;

if (getToken) {
  token = JSON.parse(getToken).token || "";
}
//  uri: "http://localhost:4000/graphql",
//uri: "https://server.dongnebooks.com/graphql",
const uploadLink = createUploadLink({
  uri: "https://server.dongnebooks.com/graphql",
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
