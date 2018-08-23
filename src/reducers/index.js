import {
  SET_TEXT,
  SET_LOCK
} from "../actions";

const initialState = {
  accountAd: null,
  web3: null,
  contracts: null,
  thisVoting: {
    id: 0,
    title: "",
    question: "",
    answers: [],
    votes: [],
    totalVotes: 0,
    valid: false,
    active: false,
    hasVoted: false
  }
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
