/**
 * Redux Reducer : "AuthReducers"
 * Purpose : Reducer provides a new state after state manipulation on a certain action
 */

import * as constants from "../constants";
let defaultProps = {
  permissions: [],
};

const AuthReducers = (state = defaultProps, action) => {
  switch (action.type) {
    case constants.SET_PERMISSIONS:
      return { ...state, permissions: action.payload.data.permissions };
    default:
      return state;
  }
};
export default AuthReducers;
