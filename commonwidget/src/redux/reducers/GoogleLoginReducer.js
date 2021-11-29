/**
 * Redux Reducer : "LoginReducers"
 * Purpose : Reducer provides a new state after state manipulation on a certain action
 */

import * as constants from "../constants";
let defaultState = {
  appEvent: "GOOGLE_LOGIN_INIT",
};

const GoogleLoginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.VALIDATE_GOOGLE_LOGIN:
      return { ...state };
    case constants.GOOGLE_VERIFY_FAILED:
      return {
        ...state,
        appEvent: action.type,
      };
    case constants.GOOGLE_VERIFY_SUCCESS:
      return {
        ...state,
        appEvent: action.type,
      };
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        appEvent: action.type,
      };
    case constants.LOGIN_FAILED:
      return {
        ...state,
        appEvent: action.type,
      };
    default:
      return state;
  }
};
export default GoogleLoginReducer;
