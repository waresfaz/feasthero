import { GET_CLASSES } from "./classType";
import { getClassAPi } from "../../services/api-service";
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
