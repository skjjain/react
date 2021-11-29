import React from "react";
import "./LoginLayoutBasic.scss";
import { useSelector } from "react-redux";
const OTPLogin = React.lazy(() => import("../components/LoginModule/OTPLogin"));
const GoogleLogin = React.lazy(() =>
  import("../components/LoginModule/GoogleLogin")
);

export default function LoginLayoutTabs() {
  const moduleOptions = useSelector(
    (state) => state.CommonReducer.moduleOptions
  );
  // console.log(
  //   "moduleOptions",
  //   moduleOptions,
  //   moduleOptions.loginOptions,
  //   moduleOptions.loginOptions.indexOf("otp")
  // );
  function renderOtpLogin() {
    if (moduleOptions.loginOptions.indexOf("otp") !== -1) {
      return (
        <div className="otpLogin">
          <OTPLogin></OTPLogin>
        </div>
      );
    }
  }
  function renderGoogleLogin() {
    if (moduleOptions.loginOptions.indexOf("google") !== -1) {
      return (
        <div className="googleLogin">
          <div className="line-or">
            <div class="line"></div>
            Or
            <div className="line"></div>
          </div>

          <GoogleLogin></GoogleLogin>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      {renderOtpLogin()}
      {renderGoogleLogin()}
    </React.Fragment>
  );
}
