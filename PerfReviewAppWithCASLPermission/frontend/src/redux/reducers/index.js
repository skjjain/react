import { combineReducers } from "redux";
import EmployeeReducer from "./EmployeeReducer";
import ReviewReducer from "./ReviewReducer";

const RootReducers = combineReducers({
  EmployeeReducer,
  ReviewReducer,
});

export default RootReducers;
