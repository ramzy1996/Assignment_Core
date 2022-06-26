import { combineReducers } from "redux";
import { students } from "./students";
import { classRoom } from "./classRoom";
import { teachers } from "./teachers";
import { subject } from "./subjects";

const rootReducer = combineReducers({
  std: students,
  cls: classRoom,
  tch: teachers,
  sbj: subject,
});
export default rootReducer;
