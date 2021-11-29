/**
 * Redux Saga : "LoginListing"
 * Purpose : Generator functions that deals with ajax calls and performs followup action
 */

import { put } from "redux-saga/effects";
import * as constants from "../constants";
import { postJsonData } from "../../utils/api";
import configs from "../../app-configs";

export function* validateGoogleLogin(data) {
  try {
    const json = yield postJsonData(
      "/iam/api/v1/user/auth/login",
      {
        token: data.payload.credential,
        mode: "gmail",
      },
      {
        "x-api-key": configs.iamApiKey,
        "x-correlation-id": "",
      }
    );

    if (json && json.statusCode == 200 && json.status == "T") {
      yield put({
        type: constants.GOOGLE_VERIFY_SUCCESS,
        payload: { ...data.payload },
      });
      yield put({
        type: constants.LOGIN_SUCCESS,
        payload: { ...data.payload },
      });
    } else {
      let errorMsg = json.errorResp.errors[0].error.err.message;
      yield put({
        type: constants.GOOGLE_VERIFY_FAILED,
        payload: { ...data.payload, error: errorMsg },
      });
    }
  } catch (error) {
    console.log("error", error);
    yield put({
      type: constants.GOOGLE_VERIFY_FAILED,
      payload: { ...data.payload, error: error.toString() },
    });
  }
}

/*
    logout: {
        url: 'iam/api/v1/user/auth/logout',
        options: {},
        urlPrefix: 'apiIAMBaseUrl'
    },
*/
