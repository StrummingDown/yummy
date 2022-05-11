import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./components/App";
import Apollo from "./components/Apollo";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <ApolloProvider client={Apollo}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ApolloProvider>,

  document.getElementById("root")
);
