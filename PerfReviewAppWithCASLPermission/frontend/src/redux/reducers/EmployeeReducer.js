/**
 * Redux Reducer : "EmployeeReducers"
 * Purpose : Reducer provides a new state after state manipulation on a certain action
 */

import * as constants from "../constants";

const EmployeeReducers = (state = {}, action) => {
  switch (action.type) {
    case constants.GET_EMPLOYEE_LISTING:
      return { ...state, waitForServer: true, empListingData: false };
    case constants.SET_EMPLOYEE_LISTING:
      return {
        ...state,
        waitForServer: false,
        empListingData: action.json.data,
        isError: false,
      };
    case constants.GET_EMPLOYEE_INFO:
      return { ...state, waitForServer: true, empData: false };
    case constants.SET_EMPLOYEE_INFO:
      return {
        ...state,
        waitForServer: false,
        empData: action.json.data[0],
        isError: false,
      };
    case constants.UPDATE_EMPLOYEE_INFO:
      return {
        ...state,
        waitForServer: true,
        isError: false,
      };
    case constants.ADD_EMPLOYEE_INFO:
      return {
        ...state,
        waitForServer: true,
        isError: false,
      };

    case constants.SET_LAST_ADDED_EMPLOYEE_ID:
      return {
        ...state,
        lastAddedEmployeeId: action.json.data.insertId,
        waitForServer: false,
        isError: false,
      };

    case constants.USER_LOGIN:
      return {
        ...state,
        waitForServer: true,
        isError: false,
      };
    case constants.CHECK_LOGIN:
      return {
        ...state,
        waitForServer: true,
        isError: false,
      };

    case constants.USER_LOGOUT:
      return {
        ...state,
        waitForServer: false,
        isError: false,
      };
    case constants.SET_LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.payload.data,
        waitForServer: false,
        isError: false,
      };

    case constants.GET_USER_LISTING:
      return { ...state, waitForServer: true, userListingData: false };
    case constants.SET_USER_LISTING:
      return {
        ...state,
        waitForServer: false,
        userListingData: action.json.data,
        isError: false,
      };
    case constants.UNSET_LAST_ADDED_EMPLOYEE_ID:
      let newState = { ...state };
      delete newState["lastAddedEmployeeId"];
      return newState;
    default:
      return state;
  }
};
export default EmployeeReducers;
