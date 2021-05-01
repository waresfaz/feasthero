import { combineReducers } from "redux";

import classReducer from "./classes/classReducer";
import scheduleReducer from "./schedule/scheduleReducer";

const rootReducer = combineReducers({
  class: classReducer,
  schedule: scheduleReducer,
});

export default rootReducer;
