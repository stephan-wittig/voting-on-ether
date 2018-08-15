// Action types
export const SET_TEXT = "SET_TEXT";
export const SET_LOCK = "SET_LOCK";

// Other constants


// Action creators
export function setText(text) {
  return {type: SET_TEXT, text}
}

export function setLock(lock) {
  return {type: SET_LOCK, lock}
}
