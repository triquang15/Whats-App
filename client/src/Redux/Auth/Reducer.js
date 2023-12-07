import {
  REQ_USER,
  SEARCH_USER,
  SIGN_IN,
  SIGN_UP,
  UPDATE_USER,
} from "./ActionType";

const initiaValue = {
  signup: null,
  signin: null,
  reqUser: null,
};

export const authReducer = (store = initiaValue, { type, payload }) => {
  if (type === SIGN_UP) {
    return { ...store, signup: payload };
  } else if (type === SIGN_IN) {
    return { ...store, signin: payload };
  } else if (type === REQ_USER) {
    return { ...store, reqUser: payload };
  } else if (type === SEARCH_USER) {
    return { ...store, searchUser: payload };
  } else if (type === UPDATE_USER) {
    return { ...store, updateUser: payload };
  }

  return store;
};
