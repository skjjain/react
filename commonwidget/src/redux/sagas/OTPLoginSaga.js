/**
 * Redux Saga : "LoginListing"
 * Purpose : Generator functions that deals with ajax calls and performs followup action
 */

import { put } from "redux-saga/effects";
import * as constants from "../constants";
import { postJsonData } from "../../utils/api";
import configs from "../../app-configs";
import loadGoogleRecaptcha from "../../utils/googleRecaptcha";

export function* initiateSendOtp(data) {
  try {
    yield put({
      type: constants.GENERATE_GOOGLE_RECAPTCHA_TOKEN,
      payload: data.payload,
    });
  } catch (error) {
    console.log("error", error);
  }
}

export function* resendLoginOtp(data) {
  try {
    yield put({
      type: constants.GENERATE_GOOGLE_RECAPTCHA_TOKEN,
      payload: { ...data.payload, resend: true },
    });
  } catch (error) {
    console.log("error", error);
  }
}

export function* generateGoogleRecaptchaToken(data) {
  try {
    const token = yield loadGoogleRecaptcha((resolve) => {
      window["grecaptcha"].ready(() => {
        window["grecaptcha"]
          .execute(configs.googleRecaptchaSiteKey, { action: "submit" })
          .then((token) => {
            resolve(token);
          });
      });
    });
    yield put({
      type: constants.SEND_LOGIN_OTP,
      payload: { token, ...data.payload },
    });
  } catch (error) {
    console.log("error", error);
  }
}

export function* sendLoginOtp(data) {
  try {
    let json = yield postJsonData(
      "/iam/api/v1/user/auth/otp",
      {
        mobile: data.payload.mobileNumber,
        sub_source: configs.subSource.toLowerCase(),
        source: configs.appName,
      },
      {
        "x-token-id": data.payload.token,
        "x-api-key": configs.iamApiKey,
        "x-correlation-id": "",
      }
    );

    if (json.data) {
      json = json.data;
    }

    if (json && json.statusCode === 200 && json.status === "T") {
      yield put({
        type: constants.OTP_SEND_SUCCESS,
        payload: { ...data.payload, authCode: json.authCode },
      });
    } else {
      yield put({
        type: constants.OTP_SEND_FAILED,
        payload: { ...data.payload },
      });
    }
  } catch (error) {
    console.log("error", error);
    yield put({
      type: constants.OTP_SEND_FAILED,
      payload: { ...data.payload, error },
    });
  }
}

export function* verifyLoginOtp(data) {
  try {
    let json = yield postJsonData(
      "/iam/api/v1/user/auth/otp-verification",
      data.payload,
      {
        "x-api-key": configs.iamApiKey,
        "x-correlation-id": "",
      }
    );

    if (json && json.statusCode == 200 && json.status == "T") {
      yield put({
        type: constants.OTP_VERIFY_SUCCESS,
        payload: { ...data.payload },
      });
      yield put({
        type: constants.LOGIN_SUCCESS,
        payload: { ...data.payload },
      });
    } else {
      let errorMsg = json.errorResp.errors[0].error.err.message;
      yield put({
        type: constants.OTP_VERIFY_FAILED,
        payload: { ...data.payload, error: errorMsg },
      });
    }
  } catch (error) {
    console.log("verifyLoginOtp error => ", error);
    yield put({
      type: constants.OTP_VERIFY_FAILED,
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
