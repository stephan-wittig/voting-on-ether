import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { DrizzleProvider } from "drizzle-react";

// CSS
import style from "./index.css";

// Components
import App from "./App";

// Reducers
import rootReducer from "./reducers"

// Contracts
import DemocraticRegistry from "../build/contracts/DemocraticRegistry.json";
import VotingOffice from "../build/contracts/VotingOffice.json";

// Drizzle Options
const options = {
  contracts: [
    DemocraticRegistry,
    VotingOffice
  ]
};


const store = createStore(rootReducer, devToolsEnhancer());

ReactDOM.render(
  <DrizzleProvider options={options}>
    <Provider store={store}>
      <App />
    </Provider>
  </DrizzleProvider>,
  document.getElementById("root")
);
