import {
  SET_VOTING,
  DEL_VOTINGS,
  SET_PAGESIZE,
  SET_PAGENUM,
  SET_FILTERACTIVE,
  SET_DISPLAYEDVOT
} from "../actions";

const initialState = {
  votings: [
    // Example: {id, active, votes}
  ],
  listOptions: {
    pageSize: 20,
    pageNum: 1,
    filterActive: false,
    displayedVotings: []
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VOTING:
      var copyOfVotings = state.votings;
      copyOfVotings[action.id] = {id: action.id, active: action.active, votes: action.votes};
      return Object.assign({}, state, {
        votings: copyOfVotings
      });
    case DEL_VOTINGS:
      return Object.assign({}, state, {
        votings: []
      });
    case SET_PAGESIZE:
      return Object.assign({}, state, {
        listOptions: {pageSize: size}
      });
    case SET_PAGENUM:
      return Object.assign({}, state, {
        listOptions: {pageNum: num}
      });
    case SET_FILTERACTIVE:
      return Object.assign({}, state, {
        listOptions: {filterActive: filter}
      });
    case SET_DISPLAYEDVOT:
      return Object.assign({}, state, (
        listOptions: {displayedVotings: ids}
      ))
    default:
      return state;
  }
}

export default rootReducer
