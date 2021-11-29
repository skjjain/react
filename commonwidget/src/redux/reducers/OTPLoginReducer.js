/**
 * Redux Reducer : "LoginReducers"
 * Purpose : Reducer provides a new state after state manipulation on a certain action
 */

import * as constants from "../constants";
import configs from "../../app-configs";
let defaultState = {
  showOtp: true,
  mobileNumber: "",
  otpCode: "",
  errorText: "",
  apiError: false,
  disableSubmit: false,
  loaderCls: false,
  showVerify: false,
  showResendOtpText: false,
  showTerm: false,
  isShowAllText: false,
  appEvent: "OTP_LOGIN_INIT",
};

const OTPLoginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.VALIDATE_GOOGLE_LOGIN:
      return { ...state };
    case constants.CHANGE_NUMBER:
      return {
        ...state,
        showVerify: false,
        showOtp: true,
        appEvent: action.type,
      };
    case constants.INITIATE_SEND_OTP:
      return {
        ...state,
        disableSubmit: true,
        loaderCls: true,
        appEvent: action.type,
      };
    case constants.RESEND_LOGIN_OTP:
      return {
        ...state,
        disableSubmit: true,
        loaderCls: true,
        appEvent: action.type,
      };
    case constants.SEND_LOGIN_OTP:
      return { ...state, appEvent: action.type };
    case constants.GENERATE_GOOGLE_RECAPTCHA_TOKEN:
      return { ...state, appEvent: action.type };
    case constants.OTP_SEND_FAILED:
      return {
        ...state,
        disableSubmit: false,
        loaderCls: false,
        errorText: configs.globalError,
        apiError: true,
        appEvent: action.type,
      };
    case constants.OTP_SEND_SUCCESS:
      return {
        ...state,
        showVerify: true,
        showOtp: false,
        disableSubmit: false,
        loaderCls: false,
        authCode: action.payload.authCode,
        showResendOtpText: !!action.payload.resend,
        appEvent: action.type,
      };
    case constants.OTP_VERIFY_FAILED:
      return {
        ...state,
        disableSubmit: false,
        loaderCls: false,
        errorText: action.payload.error,
        apiError: true,
        appEvent: action.type,
      };
    case constants.OTP_VERIFY_SUCCESS:
      return {
        ...state,
        appEvent: action.type,
      };
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        appEvent: action.type,
      };
    case constants.LOGIN_FAILED:
      return {
        ...state,
        appEvent: action.type,
      };
    case constants.VERIFY_LOGIN_OTP:
      return {
        ...state,
        disableSubmit: true,
        loaderCls: true,
        appEvent: action.type,
      };
    case constants.EMIT_LOGIN_EVENT:
      return {
        ...state,
        appEvent: action.payload.appEvent,
      };
    default:
      return state;
  }
};
export default OTPLoginReducer;
