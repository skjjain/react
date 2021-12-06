import { combineReducers } from "redux";
import EmployeeReducer from "./EmployeeReducer";
import ReviewReducer from "./ReviewReducer";
import AuthReducers from "./AuthReducers";

const RootReducers = combineReducers({
  EmployeeReducer,
  ReviewReducer,
  AuthReducers,
});

export default RootReducers;
