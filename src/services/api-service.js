import axios from "axios";
const getClassAPi = async () => {
  const data = await axios
    .get(`https://feasthero.herokuapp.com/classes`)
    .then((res) => {
      return res;
    });

  return data;
};

const bookClassAPI = async (data) => {
  let bookingResult = await axios
    .post(`https://feasthero.herokuapp.com/booking`, { data })
    .then((res) => {
      return res.data;
    });
  return bookingResult;
};

const cancelBookingAPI = async (data) => {
  let bookingResult = await axios
    .post(`https://feasthero.herokuapp.com/payment`, {
      response_order_id: data,
      is_cancelled: true,
    })
    .then((res) => {
      return res;
    });
  return bookingResult;
};

const getScheduleAPI = async (class_id) => {
  const data = await axios
    .get(`https://feasthero.herokuapp.com/schedule/` + class_id)
    .then((res) => {
      return res;
    });

  return data;
};

export { getClassAPi, bookClassAPI, cancelBookingAPI, getScheduleAPI };
