import axios from "axios";

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

const getOrderAPI = async (order_id) => {
    const data = await axios
        .get(`https://feasthero.herokuapp.com/order/` + order_id)
        .then((res) => {
            return res.data;
        });

    return data;
};

export { bookClassAPI, cancelBookingAPI, getOrderAPI };