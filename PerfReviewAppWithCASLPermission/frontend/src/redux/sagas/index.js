import { all, takeEvery } from "redux-saga/effects";
import * as constants from "../constants/index";
import {
  fetchEmpInfo,
  fetchEmpListing,
  updateEmpInfo,
  addEmpInfo,
  deleteEmployee,
  userLogin,
  fetchUserListing,
  checkLogin,
  userLogout,
} from "./employeeListing";

import {
  fetchReviewInfo,
  fetchReviewListing,
  updateReviewInfo,
  addReviewInfo,
  deleteReviewloyee,
  submitReview,
} from "./reviewListing";

function* employeeActionWatcher() {
  yield takeEvery(constants.GET_EMPLOYEE_LISTING, fetchEmpListing);
  yield takeEvery(constants.GET_EMPLOYEE_INFO, fetchEmpInfo);
  yield takeEvery(constants.UPDATE_EMPLOYEE_INFO, updateEmpInfo);
  yield takeEvery(constants.ADD_EMPLOYEE_INFO, addEmpInfo);
  yield takeEvery(constants.DELETE_EMPLOYEE, deleteEmployee);
  yield takeEvery(constants.USER_LOGIN, userLogin);
  yield takeEvery(constants.GET_USER_LISTING, fetchUserListing);
  yield takeEvery(constants.CHECK_LOGIN, checkLogin);
  yield takeEvery(constants.USER_LOGOUT, userLogout);
}

function* reviewActionWatcher() {
  yield takeEvery(constants.GET_REVIEW_LISTING, fetchReviewListing);
  yield takeEvery(constants.GET_REVIEW_INFO, fetchReviewInfo);
  yield takeEvery(constants.UPDATE_REVIEW_INFO, updateReviewInfo);
  yield takeEvery(constants.ADD_REVIEW_INFO, addReviewInfo);
  yield takeEvery(constants.DELETE_REVIEW, deleteReviewloyee);
  yield takeEvery(constants.SUBMIT_REVIEW, submitReview);
}

export default function* rootSaga() {
  yield all([employeeActionWatcher(), reviewActionWatcher()]);
}
