import axios from "axios";

const getScheduleAPI = async (class_id) => {
  const data = await axios
    .get(`https://feasthero.herokuapp.com/schedule/` + class_id)
    .then((res) => {
      return res;
    });

  return data;
};

export { getScheduleAPI };