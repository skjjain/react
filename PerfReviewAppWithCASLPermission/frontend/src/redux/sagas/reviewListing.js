/**
 * Redux Saga : "Reviewisting"
 * Purpose : Generator functions that deals with ajax calls and performs followup action
 */

import { put } from "redux-saga/effects";
import * as constants from "../constants";
import axios from "axios";

export function* fetchReviewListing(param) {
  try {
    const json = yield axios.get("http://localhost:8080/review", {
      withCredentials: true,
    });
    yield put({ type: constants.SET_REVIEW_LISTING, json: json });
  } catch (error) {
    yield put({ type: constants.REVIEW_ERROR, error: error, isError: true });
  }
}

export function* fetchReviewInfo(param) {
  try {
    const json = yield axios.get(
      "http://localhost:8080/review/" + param.payload.id
    );
    yield put({ type: constants.SET_REVIEW_INFO, json: json });
  } catch (error) {
    yield put({ type: constants.REVIEW_ERROR, error: error, isError: true });
  }
}

export function* updateReviewInfo(param) {
  try {
    yield axios.put("http://localhost:8080/review", param.payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put({
      type: constants.SET_LAST_ADDED_REVIEW_ID,
      json: { data: param.payload },
    });
  } catch (error) {
    yield put({ type: constants.REVIEW_ERROR, error: error, isError: true });
  }
}

export function* submitReview(param) {
  try {
    yield axios.put("http://localhost:8080/submit-review", param.payload, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put({
      type: constants.SET_LAST_ADDED_REVIEW_ID,
      json: { data: param.payload },
    });
  } catch (error) {
    yield put({ type: constants.REVIEW_ERROR, error: error, isError: true });
  }
}

export function* addReviewInfo(param) {
  try {
    const json = yield axios.post(
      "http://localhost:8080/review",
      param.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    yield put({
      type: constants.SET_LAST_ADDED_REVIEW_ID,
      json: json,
    });
  } catch (error) {
    yield put({ type: constants.REVIEW_ERROR, error: error, isError: true });
  }
}

export function* deleteReviewloyee(param) {
  try {
    yield axios.delete(
      "http://localhost:8080/review/" + param.payload.review_id
    );
    yield put({
      type: constants.GET_REVIEW_LISTING,
    });
  } catch (error) {
    yield put({ type: constants.REVIEW_ERROR, error: error, isError: true });
  }
}
