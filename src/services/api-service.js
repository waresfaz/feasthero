import axios from "axios";
const getClassAPi = async () => {
  const data = await axios.get(`http://localhost:3001/classes`).then((res) => {
    return res;
  });

  return data;
};

const bookClassAPI = async (data) => {
  let bookingResult = await axios
    .post(`http://localhost:3001/booking`, { data })
    .then((res) => {
      return res.data;
    });
  return bookingResult;
};

const paymentAPI = async (data) => {
  var bodyFormData = new FormData();
  bodyFormData.append("ps_store_id", "CVQNQtore1");
  bodyFormData.append("hpp_key", "hpB9RYVYPULN");
  bodyFormData.append("charge_total", "40.00");
  let bookingResult = await axios
    .post(`https://esqa.moneris.com/HPPDP/index.php`, { data })
    .then((res) => {
      return res.data;
    });
  return bookingResult;
};

const getScheduleAPI = async (class_id) => {
  const data = await axios
    .get(`http://localhost:3001/schedule/` + class_id)
    .then((res) => {
      return res;
    });

  return data;
};

export { getClassAPi, bookClassAPI, paymentAPI, getScheduleAPI };
