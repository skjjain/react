/**
 * Redux Actions : "EmployeeAction"
 * Purpose : Defines state manipulation functions to components
 */

import * as constants from "../constants";

export const getEmployeeListing = (payload) => {
  return { type: constants.GET_EMPLOYEE_LISTING, payload: payload };
};

export const getEmployeeInfo = (payload) => {
  return { type: constants.GET_EMPLOYEE_INFO, payload: payload };
};

export const updateEmployeeInfo = (payload) => {
  return { type: constants.UPDATE_EMPLOYEE_INFO, payload: payload };
};

export const addEmployeeInfo = (payload) => {
  return { type: constants.ADD_EMPLOYEE_INFO, payload: payload };
};

export const unsetLastAddedEmployeeId = () => {
  return { type: constants.UNSET_LAST_ADDED_EMPLOYEE_ID };
};

export const deleteEmployee = (payload) => {
  return { type: constants.DELETE_EMPLOYEE, payload: payload };
};

export const userLogin = (payload) => {
  return { type: constants.USER_LOGIN, payload: payload };
};

export const userLogout = (payload) => {
  return { type: constants.USER_LOGOUT, payload: payload };
};

export const checkLogin = (payload) => {
  return { type: constants.CHECK_LOGIN, payload: payload };
};

export const setLoginStatus = (payload) => {
  return { type: constants.SET_LOGIN_STATUS, payload: payload };
};

export const getUserListing = (payload) => {
  return { type: constants.GET_USER_LISTING, payload: payload };
};
