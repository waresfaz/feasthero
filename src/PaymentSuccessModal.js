import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getOrderAPI } from "./services/api-service";
import "./PaymentModal.css";
import moment from "moment";
import "moment-timezone";

const PaymentSuccessModal = () => {
  // Moneris will redirect to the home page if a transaction is "cancelled" , and will pass the order_id in the url query string
  let location = useLocation();
  let history = useHistory();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getOrderDetails = async (order_id) => {
      let data = await getOrderAPI(order_id);
      if (data.data[0].booking_status == "failed") {
        return history.push("/payment_failure/?order_id=" + order_id);
      }
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
                fill="green"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </div>
            {order && (
              <div className="content">
                <h1>Class Booked Successfully !</h1>
                <p>
                  You will recieve a mail on {order.customer_email} with the
                  details of the scheduled class{" "}
                </p>
                <h2>Here are the Class details :</h2>
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
                  <b> Class Zoom link :</b>
                  <a href={order.zoom_link}>{order.zoom_link}</a>
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
                <a href="/">Go to Home</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccessModal;
