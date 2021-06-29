import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ShareConfirmation from "./ShareConfirmation";

export default function BookingFailed({ order }) {
  return (
    <>
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="rgba(192, 26, 26, 0.884)"
          className="bi bi-x-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
      </div>
      <div className="step-progressContentBox">
        <div className="stepprogress-modeltext-top-middle">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7">
              <div className="stepprogress-topmodel text-center">
                <div className="top-model-textbox">
                  <h2>Class Booking Failed !</h2>
                  <p>Here are the Transaction details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="paymentbooking-detailsprocess-box confimed-masg">
        <div className="row justify-content-center">
          <div className="col-xl-9 col-lg-9 col-md-9">
            <div className="booking-detailsbox confimed-masg">
              <div className="confirmation-detailstblebox">
                <div className="lebel-confirmationsendmsg">
                  <ul className="confirmation-detailstable">
                    <li className="confirmation-detailsLink">
                      <h6>First Name:</h6>
                    </li>
                    <li className="confirmation-detailsLink">
                      <h6>Last Name:</h6>
                    </li>
                    <li className="confirmation-detailsLink">
                      <h6>Company Name:</h6>
                    </li>
                    <li className="confirmation-detailsLink">
                      <h6>Number of Devices: </h6>
                    </li>
                    <li className="confirmation-detailsLink">
                      <h6>Opted for meal kit : </h6>
                    </li>
                    <li className="confirmation-detailsLink">
                      <h6>Date and Time:</h6>
                    </li>
                    <li className="confirmation-detailsLink">
                      <h6>Payment transaction id:</h6>
                    </li>
                    <li className="confirmation-detailsLink">
                      <h6>Payment Failure reason:</h6>
                    </li>
                  </ul>
                  <ul className="confirmation-detailstable confirm-tablebox">
                    <li className="confirmation-detailsLink">
                      <span>{order.customer_first_name || "/"}</span>
                    </li>
                    <li className="confirmation-detailsLink">
                      <span>{order.customer_last_name || "/"}</span>
                    </li>
                    <li className="confirmation-detailsLink">
                      <span>{order.company_name || "/"}</span>
                    </li>
                    <li className="confirmation-detailsLink">
                      <span>{order.booking_size}</span>
                    </li>
                    <li className="confirmation-detailsLink">
                      <span>1</span>
                    </li>
                    <li className="confirmation-detailsLink">
                      <span>
                        {moment
                          .utc(order.booking_datetime)
                          .tz("US/Eastern")
                          .format("dddd, MMMM D,YYYY,hh:mm a")}
                      </span>
                    </li>

                    <li className="confirmation-detailsLink">
                      <span>{order.bank_transaction_id || "/"}</span>
                    </li>
                    <li className="confirmation-detailsLink">
                      <span>{order.response_message || "/"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <ShareConfirmation /> */}
            </div>
          </div>
        </div>
        <div className="sendConfirmation-btnbox text-center">
          <Link to="/" className="send-confirmbtn btn-str backhome">
            Back Home
          </Link>
        </div>
      </div>
    </>
  );
}
