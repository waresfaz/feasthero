import { combineReducers } from "redux";

import classReducer from "../../services/class/reducer";
import scheduleReducer from "../../services/schedule/reducer";

const rootReducer = combineReducers({
  class: classReducer,
  schedule: scheduleReducer,
});

export default rootReducer;
