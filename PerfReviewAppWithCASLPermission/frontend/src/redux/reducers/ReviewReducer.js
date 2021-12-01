/**
 * Redux Reducer : "ReviewReducers"
 * Purpose : Reducer provides a new state after state manipulation on a certain action
 */

import * as constants from "../constants";

const ReviewReducers = (state = {}, action) => {
  switch (action.type) {
    case constants.GET_REVIEW_LISTING:
      return { ...state, waitForServer: true, reviewListingData: false };
    case constants.SET_REVIEW_LISTING:
      return {
        ...state,
        waitForServer: false,
        reviewListingData: action.json.data,
        isError: false,
      };
    case constants.GET_REVIEW_INFO:
      return { ...state, waitForServer: true, reviewData: false };
    case constants.SET_REVIEW_INFO:
      return {
        ...state,
        waitForServer: false,
        reviewData: action.json.data[0],
        isError: false,
      };
    case constants.UPDATE_REVIEW_INFO:
      return {
        ...state,
        waitForServer: true,
        isError: false,
      };
    case constants.SUBMIT_REVIEW:
      return {
        ...state,
        waitForServer: true,
        isError: false,
      };
    case constants.ADD_REVIEW_INFO:
      return {
        ...state,
        waitForServer: true,
        isError: false,
      };

    case constants.SET_LAST_ADDED_REVIEW_ID:
      return {
        ...state,
        lastAddedReviewId:
          action.json.data.review_id || action.json.data.insertId,
        waitForServer: false,
        isError: false,
      };
    case constants.UNSET_LAST_ADDED_REVIEW_ID:
      let newState = { ...state };
      delete newState["lastAddedReviewId"];
      return newState;
    default:
      return state;
  }
};
export default ReviewReducers;
