// Drizzle options
import drizzleOptions from "./drizzleOptions";

// Middleware
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";

// Saga
import rootSaga from "./rootSaga";

// Drizzle
import { generateContractsInitialState } from "drizzle";

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";

// Devtools anwenden
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Drizzle initial state
const drizzleState = {
  contracts: generateContractsInitialState(drizzleOptions)
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  drizzleState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware
    )
  )
);

sagaMiddleware.run(rootSaga);

export default store;
