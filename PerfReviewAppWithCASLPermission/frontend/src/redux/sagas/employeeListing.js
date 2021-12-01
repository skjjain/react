/**
 * Redux Saga : "EmployeeListing"
 * Purpose : Generator functions that deals with ajax calls and performs followup action
 */

import { put } from "redux-saga/effects";
import * as constants from "../constants";
import axios from "axios";

export function* fetchEmpListing(param) {
  try {
    const json = yield axios.get("http://localhost:8080/emp");
    yield put({ type: constants.SET_EMPLOYEE_LISTING, json: json });
  } catch (error) {
    yield put({ type: constants.EMPLOYEE_ERROR, error: error, isError: true });
  }
}

export function* fetchUserListing(param) {
  try {
    const json = yield axios.get("http://localhost:8080/users");
    yield put({ type: constants.SET_USER_LISTING, json: json });
  } catch (error) {
    yield put({ type: constants.EMPLOYEE_ERROR, error: error, isError: true });
  }
}

export function* fetchEmpInfo(param) {
  try {
    const json = yield axios.get(
      "http://localhost:8080/emp/" + param.payload.id
    );
    yield put({ type: constants.SET_EMPLOYEE_INFO, json: json });
  } catch (error) {
    yield put({ type: constants.EMPLOYEE_ERROR, error: error, isError: true });
  }
}

export function* updateEmpInfo(param) {
  try {
    yield axios.put("http://localhost:8080/emp", param.payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put({
      type: constants.SET_EMPLOYEE_INFO,
      json: { data: param.payload },
    });
  } catch (error) {
    yield put({ type: constants.EMPLOYEE_ERROR, error: error, isError: true });
  }
}

export function* addEmpInfo(param) {
  try {
    const json = yield axios.post("http://localhost:8080/emp", param.payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put({
      type: constants.SET_LAST_ADDED_EMPLOYEE_ID,
      json: json,
    });
  } catch (error) {
    yield put({ type: constants.EMPLOYEE_ERROR, error: error, isError: true });
  }
}

export function* deleteEmployee(param) {
  try {
    yield axios.delete("http://localhost:8080/emp/" + param.payload.emp_id);
    yield put({
      type: constants.GET_EMPLOYEE_LISTING,
    });
  } catch (error) {
    yield put({ type: constants.EMPLOYEE_ERROR, error: error, isError: true });
  }
}

export function* userLogin(param) {
  try {
    const json = yield axios.post(
      "http://localhost:8080/login",
      param.payload,
      { withCredentials: true }
    );
    yield put({
      type: constants.SET_LOGIN_STATUS,
      json: json,
    });
  } catch (error) {
    yield put({ type: constants.EMPLOYEE_ERROR, error: error, isError: true });
  }
}

export function* checkLogin(param) {
  try {
    const json = yield axios.get("http://localhost:8080/login", {
      withCredentials: true,
    });
    yield put({
      type: constants.SET_LOGIN_STATUS,
      json: json,
    });
  } catch (error) {
    yield put({ type: constants.EMPLOYEE_ERROR, error: error, isError: true });
  }
}

export function* userLogout(param) {
  try {
    const json = yield axios.get("http://localhost:8080/logout", {
      withCredentials: true,
    });
    yield put({
      type: constants.SET_LOGIN_STATUS,
      json: json,
    });
  } catch (error) {
    yield put({ type: constants.EMPLOYEE_ERROR, error: error, isError: true });
  }
}
