import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DrizzleContext } from "drizzle-react";
import { BrowserRouter } from "react-router-dom";

// Configs
import reduxStore from "./reduxStore";
import drizzle from "./drizzle";

// CSS
import "./index.css";

// Components
import App from "./App";
import DrizzleLoading from "./components/drizzleLoading/DrizzleLoading";
import DrizzleError from "./components/drizzleError/DrizzleError";
import LoadingContainer from "./components/loadingContainer/LoadingContainer";

ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
      <Provider store={reduxStore}>
        <BrowserRouter>
          <LoadingContainer LoadingComp={DrizzleLoading}>
            abc
            <App/>
          </LoadingContainer>
        </BrowserRouter>
      </Provider>
    </DrizzleContext.Provider>,
  document.getElementById("root")
);
