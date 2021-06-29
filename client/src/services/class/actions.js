import { GET_CLASSES } from "./types";
import axios from "axios";

export function getClasses() {
  return (dispatch) => {
    return axios
      .get(`https://feasthero.herokuapp.com/classes`)
      .then((json) => {
        dispatch(fetchClasses(json.data.data));
        return json.data.data;
      })
      .catch((error) => console.log(error));
  };
}

export const fetchClasses = (value) => {
  return {
    type: GET_CLASSES,
    values: value,
  };
};
