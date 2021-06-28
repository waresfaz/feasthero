import { GET_SCHEDULE } from "./scheduleType";
const initialState = [];

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return {
        ...state,
        state: action.values,
      };
    default:
      return state;
  }
};
export default scheduleReducer;
