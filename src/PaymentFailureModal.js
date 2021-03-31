import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getOrderAPI } from "./services/api-service";
import "./PaymentFailureModal.css";
import moment from "moment";
import "moment-timezone";

const PaymentFailureModal = () => {
  // Moneris will redirect to the home page if a transaction is "cancelled" , and will pass the order_id in the url query string
  let location = useLocation();
  let history = useHistory();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getOrderDetails = async (order_id) => {
      let data = await getOrderAPI(order_id);
      setOrder(data.data[0]);
    };
    let params = location.search.split("=");
    params = params[1]; // fetching the cancelled order_id from query string
    if (params == undefined) {
      history.push("/");
    } else {
      getOrderDetails(params);
    }
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <div className="payment">
            <div className="check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="rgba(192, 26, 26, 0.884)"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </div>
            {order && (
              <div className="content">
                <h1>Class Booking Failed !</h1>
                <h2>Here are the Transaction details :</h2>
                <p>
                  {" "}
                  <b> Company Name :</b>
                  {order.company_name}
                </p>
                <p>
                  {" "}
                  <b> Customer Name : </b>
                  {order.customer_first_name +
                    "  " +
                    order.customer_last_name}{" "}
                </p>
                <p>
                  {" "}
                  <b> Class Booked for : </b>
                  {order.booking_size + " people "}
                </p>
                <p>
                  {" "}
                  <b> Class Cost : $</b>
                  {order.cost}
                </p>
                <p>
                  <b> Class Date and Time :</b>
                  {moment
                    .utc(order.booking_datetime)
                    .tz("US/Eastern")
                    .format("dddd, MMMM D,YYYY,hh:mm a")}
                </p>
                <p>
                  {" "}
                  <b> Payment transaction id :</b> {order.bank_transaction_id}
                </p>
                <p>
                  {" "}
                  <b> Payment Failure reason :</b> {order.response_message}
                </p>
                <a href="/">Go to Home</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentFailureModal;
