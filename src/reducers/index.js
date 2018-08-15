import {
  SET_TEXT,
  SET_LOCK
} from "../actions";

const initialState = {
  locked: false,
  storedText: ""
}

const app =(state = initialState, action) => {
  switch (action.type) {
    case SET_LOCK:
      return Object.assign({}, state, {
        locked: action.lock
      });
    case SET_TEXT:
      return Object.assign({}, state, {
        storedText: action.text
      });
    default:
      return state;
  }

}

export default app
