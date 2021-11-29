import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../scss/login.css";
import loginbg from "../images/loginbg.png";
import idLogo from "../assets/svg/logo_colored.svg";
import "../scss/login.css";
import { useSelector, useDispatch } from "react-redux";
import CommonWidget from "src/components/CommonWidget";
import {
  // setEmailLogin,
  // setShowUploadButton,
  // loginPostUtr,
  loginPostSuccessUtr,
  // getUTRLoginResponse,
} from "src/redux/actions/UTRActions";
function LoginHooksUtrV2() {
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    try {
      if (typeof window.loginWidget == "undefined") {
        var loginWidget = new CommonWidget("utr-login", "LoginModule");
        loginWidget.setEventListener(loginEventListener);
        loginWidget.setLoginOptions(["otp", "google"]);
        loginWidget.init();
      }
    } catch (e) {
      console.log(e);
    }
  });

  const loginEventListener = (name, payload = {}) => {
    console.log("loginEventListener", name, payload);
    switch (name) {
      case "LOGIN_SUCCESS": {
        dispatch(loginPostSuccessUtr(false));
        history.push("/utr/tracking");
      }
    }
  };

  return (
    <div className="heightVh">
      <img src={loginbg} alt="Login-Background" className="loginbg" />
      <div className="logMain">
        <div className="LoginWrap">
          <img src={idLogo} alt="Insurancedekho" className="idlogo" />
          <h1>Hey, good to see you again !</h1>
          <div className="subtitle">Login to Payout Tracker to get going</div>
          <div
            className="LogCard"
            dangerouslySetInnerHTML={{
              __html: '<div id="utr-login"></div>',
            }}
          ></div>{" "}
        </div>
      </div>
    </div>
  );
}

export default LoginHooksUtrV2;
