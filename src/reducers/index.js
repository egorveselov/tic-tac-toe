import timeReducer from "./timeReducer";
import paramsReducer from "./paramsReducer";
import modalReducer from "./modalReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  timeReducer,
  modalReducer,
  paramsReducer,
})

export default rootReducer;