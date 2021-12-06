/**
 * Redux Actions : "ReviewAction"
 * Purpose : Defines state manipulation functions to components
 */

import * as constants from "../constants";

export const setPermissions = (payload) => {
  return { type: constants.SET_PERMISSIONS, payload: payload };
};
