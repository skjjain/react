import React, { useEffect, useState } from "react";
import FormInput from "../../forms/FormInput";
import "./OTPLogin.scss";
import filterMobile from "../../../utils/filterMobile";
import FormValidator from "simple-react-validator";
import { useSelector, useDispatch } from "react-redux";
import configs from "../../../app-configs";
import {
  initiateSendOtp,
  changeNumber,
  verifyLoginOtp,
  resendLoginOtp,
} from "../../../redux/actions";

export default function OTPLogin() {
  const showOtp = useSelector((state) => state.OTPLoginReducer.showOtp);
  const disableSubmit = useSelector(
    (state) => state.OTPLoginReducer.disableSubmit
  );
  const errorText = useSelector((state) => state.OTPLoginReducer.errorText);
  const apiError = useSelector((state) => state.OTPLoginReducer.apiError);
  const loaderCls = useSelector((state) => state.OTPLoginReducer.loaderCls);
  const showVerify = useSelector((state) => state.OTPLoginReducer.showVerify);
  const appEvent = useSelector((state) => state.OTPLoginReducer.appEvent);
  const moduleOptions = useSelector(
    (state) => state.CommonReducer.moduleOptions
  );

  const showResendOtpText = useSelector(
    (state) => state.OTPLoginReducer.showResendOtpText
  );
  const authCode = useSelector((state) => state.OTPLoginReducer.authCode);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const dispatch = useDispatch();

  let validator = new FormValidator({
    validators: {
      mobileNumber: {
        // name the rule
        message: "Invalid :attribute.",
        rule: (val, params, validator) => {
          return (
            validator.helpers.testRegex(
              val,
              "^(?![9]{10})(?:[6|7|8|9][0-9]{9})$"
            ) && params.indexOf(val) === -1
          );
        },
        messageReplace: (message, params) =>
          message.replace(":values", this.helpers.toSentence(params)),
        required: true,
      },
    },
  });

  useEffect(
    function () {
      moduleOptions.eventListener(appEvent);
    },
    [appEvent]
  );

  function onChangeNumber() {
    dispatch(changeNumber());
  }
  function sendLoginOtp() {
    if (validator.allValid()) {
      dispatch(initiateSendOtp({ mobileNumber: mobileNumber }));
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  }

  function verifyOtp(value = otpCode, mobileNo = mobileNumber) {
    let obj = {};
    obj.mobile = mobileNo;
    obj.sub_source = configs.subSource.toLowerCase();
    obj.source = configs.appName;
    obj.otp = value ? value : "";
    obj.authCode = authCode;
    dispatch(verifyLoginOtp(obj));
  }
  function resendOtp() {
    dispatch(resendLoginOtp({ mobileNumber: mobileNumber }));
  }

  useEffect(() => {
    if (
      mobileNumber.length === 10 &&
      mobileNumber.match(/^(?![9]{10})(?:[6|7|8|9][0-9]{9})$/)
    ) {
      // let o = { event: "MyAccount", lead_action: "mobile_number_filled" };
      // globals.setDataLayer(null, null, true, false, o);
    }
  }, [mobileNumber]);

  useEffect(() => {
    if (otpCode.length === 6) {
      // let o = { event: "MyAccount", lead_action: "otp_filled" };
      // globals.setDataLayer(null, null, true, false, o);
    }
  }, [otpCode]);

  function changeHandler(event) {
    const target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    if (target.name === "mobileNumber") {
      value = filterMobile(value);
      if (value.length <= 10 && value <= 9999999999) {
        setMobileNumber(value);
      }
      if (validator.fieldValid("mobileNumber")) {
        //do nothing
        validator.hideMessageFor("mobileNumber");
      } else {
        validator.showMessageFor("mobileNumber");
      }
    } else if (target.name === "otpCode") {
      if (value <= 999999) {
        setOtpCode(value);
      }
    } else {
    }
  }

  return (
    <div id="OTPLogin">
      {showOtp ? (
        <div className="gsc_mtl_field col s12 relative">
          <div>
            <h4>Login with Mobile Number</h4>
            <FormInput
              inputProps={{
                id: "mobileNumber",
                type: "tel",
                name: "mobileNumber",
                value: mobileNumber,
                onChange: changeHandler,
                autoComplete: "phone",
              }}
              labelProps={{
                label: "Mobile Number",
              }}
              className="left1rem"
              error={validator.message(
                "mobileNumber",
                mobileNumber,
                "required|mobileNumber|max:13|min:10"
              )}
            />

            <button
              className={`${
                disableSubmit ? "btn-default Ripple-parent disabled" : ""
              } RedButton margin-L0`}
              disabled={disableSubmit}
              onClick={() => sendLoginOtp()}
            >
              <span>
                Send OTP{" "}
                <i className={` ${loaderCls ? "whiteCircle_m" : ""}`}></i>
              </span>
            </button>
          </div>
          {apiError ? (
            <div className="srv-validation-message">{errorText}</div>
          ) : null}
        </div>
      ) : null}
      <div>
        {showVerify ? (
          <div className="gsc_mtl_field col s12 relative">
            <div>
              <h4>
                Enter the OTP sent on {mobileNumber}{" "}
                <span className="font-11 blue pointer" onClick={onChangeNumber}>
                  Change
                </span>
              </h4>
            </div>
            <FormInput
              inputProps={{
                id: "otpCode",
                type: "number",
                maxLength: "6",
                name: "otpCode",
                value: otpCode,
                onChange: changeHandler,
              }}
              labelProps={{
                label: "Enter OTP, Sent on your Mobile",
              }}
              className="left1rem"
              error={validator.message(
                "otp",
                otpCode,
                "required|numeric|min:6|max:6"
              )}
            />
            <button
              className={`${
                disableSubmit ? "btn-default Ripple-parent disabled" : ""
              } RedButton margin-L0`}
              disabled={disableSubmit}
              onClick={() => verifyOtp()}
            >
              <span>
                Verify OTP{" "}
                <i className={` ${loaderCls ? "whiteCircle_m" : ""}`}></i>
              </span>
            </button>
            {apiError ? (
              <div className="srv-validation-message">{errorText}</div>
            ) : null}
            {showResendOtpText ? (
              <div className="srv-validation-message">
                OTP Resend successfully
              </div>
            ) : null}
            <small>
              Didn’t get the OTP?{" "}
              <b className="blue pointer" onClick={() => resendOtp()}>
                Resend{" "}
              </b>
            </small>
          </div>
        ) : null}
      </div>
    </div>
  );
}
