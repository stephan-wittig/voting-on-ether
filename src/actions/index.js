// Action types
export const SET_TEXT = "SET_TEXT";
export const SET_LOCK = "SET_LOCK";
export const SET_VOTING = "SET_VOTING";
export const DEL_VOTINGS = "DEL_VOTINGS";
export const SET_PAGESIZE = "SET_PAGESIZE";
export const SET_PAGENUM = "SET_PAGENUM";
export const SET_FILTERACTIVE = "SET_FILTERACTIVE";
export const SET_DISPLAYEDVOT = "SET_DISPLAYEDVOT";

// Other constants


// Action creators
export function setVoting(id, active, votes) {
  return {type: SET_VOTING, id, active, votes}
}

export function deleteVotings() {
  return {type: DEL_VOTINGS}
}

export function setPagesize(size) {
  return {type: SET_PAGESIZE, size}
}

export function setPagenum(num) {
  return {type: SET_PAGENUM, num}
}

export function setFilterActive(filter) {
  return {type: SET_FILTERACTIVE}
}

export function setDisplayedVotings(ids) {
  return {type: SET_DISPLAYEDVOT, ids}
}
