/**
 * Redux Actions : "ReviewAction"
 * Purpose : Defines state manipulation functions to components
 */

import * as constants from "../constants";

export const getReviewListing = (payload) => {
  return { type: constants.GET_REVIEW_LISTING, payload: payload };
};

export const getReviewInfo = (payload) => {
  return { type: constants.GET_REVIEW_INFO, payload: payload };
};

export const updateReviewInfo = (payload) => {
  return { type: constants.UPDATE_REVIEW_INFO, payload: payload };
};

export const addReviewInfo = (payload) => {
  return { type: constants.ADD_REVIEW_INFO, payload: payload };
};

export const unsetLastAddedReviewId = () => {
  return { type: constants.UNSET_LAST_ADDED_REVIEW_ID };
};

export const deleteReview = (payload) => {
  return { type: constants.DELETE_REVIEW, payload: payload };
};

export const submitReview = (payload) => {
  return { type: constants.SUBMIT_REVIEW, payload: payload };
};
