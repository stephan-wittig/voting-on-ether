import React from "react";
import ReactDOM from "react-dom";
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";

// Configs
import store from "./store";
import drizzleOptions from "./drizzleOptions";

// CSS
import style from "./index.css";

// Components
import App from "./App";
import DrizzleLoading from "./components/drizzleLoading/DrizzleLoading";
import DrizzleError from "./components/drizzleError/DrizzleError";

ReactDOM.render(
  <DrizzleProvider options={drizzleOptions} store={store}>
    <LoadingContainer errorComp={<DrizzleLoading/>} loadingComp={<DrizzleError/>}>
      <App/>
    </LoadingContainer>
  </DrizzleProvider>,
  document.getElementById("root")
);
