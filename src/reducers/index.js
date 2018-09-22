import { combineReducers } from "redux";
import { drizzleReducers } from "drizzle";
import rootReducer from "./rootReducer";

const reducer = combineReducers({
  rootReducer,
  ...drizzleReducers
});

export default reducer;
