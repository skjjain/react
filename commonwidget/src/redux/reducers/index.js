import { combineReducers } from "redux";
import OTPLoginReducer from "./OTPLoginReducer";
import GoogleLoginReducer from "./GoogleLoginReducer";
import CommonReducer from "./CommonReducer";

const RootReducers = combineReducers({
  OTPLoginReducer,
  GoogleLoginReducer,
  CommonReducer,
});

export default RootReducers;
