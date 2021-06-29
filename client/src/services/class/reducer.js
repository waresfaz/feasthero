import { GET_CLASSES } from "./types";
const initialState = [];

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,
        state: action.values,
      };
    default:
      return state;
  }
};
export default classReducer;
