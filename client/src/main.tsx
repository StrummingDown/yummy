import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./components/App";
import Apollo from "./components/Apollo";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <RecoilRoot>
    <ApolloProvider client={Apollo}>
      <App />
    </ApolloProvider>
  </RecoilRoot>,

  document.getElementById("root")
);
