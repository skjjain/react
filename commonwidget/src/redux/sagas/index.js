import { all, takeEvery } from "redux-saga/effects";
import * as constants from "../constants/index";
import {
  initiateSendOtp,
  resendLoginOtp,
  sendLoginOtp,
  generateGoogleRecaptchaToken,
  verifyLoginOtp,
} from "./OTPLoginSaga";
import { validateGoogleLogin } from "./GoogleLoginSaga";

function* loginActionWatcher() {
  yield takeEvery(constants.VALIDATE_GOOGLE_LOGIN, validateGoogleLogin);
  yield takeEvery(constants.INITIATE_SEND_OTP, initiateSendOtp);
  yield takeEvery(constants.SEND_LOGIN_OTP, sendLoginOtp);
  yield takeEvery(
    constants.GENERATE_GOOGLE_RECAPTCHA_TOKEN,
    generateGoogleRecaptchaToken
  );
  yield takeEvery(constants.VERIFY_LOGIN_OTP, verifyLoginOtp);
  yield takeEvery(constants.RESEND_LOGIN_OTP, resendLoginOtp);
}

export default function* rootSaga() {
  yield all([loginActionWatcher()]);
}
