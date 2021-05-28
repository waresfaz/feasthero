import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { bookClassAPI, getOrderAPI } from "../services/api-service";
import BookingFailed from "./BookingFailed";

export default function PaymentFailureView() {
  // Moneris will redirect to the home page if a transaction is "cancelled" , and will pass the order_id in the url query string
  let location = useLocation();
  let history = useHistory();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getOrderDetails = async (order_id) => {
      let data = await getOrderAPI(order_id);
      if (data.data[0].booking_status === "success") {
        return history.push("/payment_success?order_id=" + order_id);
      }
      setOrder(data.data[0]);
    };
    let params = location.search.split("=");
    params = params[1]; // fetching the cancelled order_id from query string
    if (params === undefined) {
      history.push("/");
    } else {
      getOrderDetails(params);
    }
  }, [history, location]);
  return (
    <section className="step-progress-section">
      <ul className="stepTop-count mb-25 pt-100">
        <li className="step-progresslink text-center">
          <span className="number">1</span>
          <h6 className="infotext">Booking Details</h6>
          <span className="progress-line"></span>
        </li>
        <li className="step-progresslink text-center">
          <span className="number">2</span>
          <h6 className="infotext">Payment Details</h6>
          <span className="progress-line"></span>
        </li>
        <li className="step-progresslink text-center current">
          <span className="number">3</span>
          <h6 className="infotext">Confirmation</h6>
        </li>
      </ul>

      {order && <BookingFailed order={order} />}
    </section>
  );
}
