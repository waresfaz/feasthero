import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ShareConfirmation from "./ShareConfirmation";

export default function BookingSuccess({ order }) {
  return (
    <>
      <div className="text-center">
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
      <div className="step-progressContentBox">
        <div className="stepprogress-modeltext-top-middle">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7">
              <div className="stepprogress-topmodel text-center">
                <div className="top-model-textbox">
                  <h2>Class Booked Successfully !</h2>
                  <p>
                    An email will be sent shortly with your booking
                    confirmation.
                  </p>
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
                    {/* <li className="confirmation-detailsLink">
                      <h6>Opted for meal kit : </h6>
                    </li> */}
                    <li className="confirmation-detailsLink">
                      <h6>Date and Time:</h6>
                    </li>
                    <li className="confirmation-detailsLink">
                      <h6>Class Zoom Link:</h6>
                    </li>
                    <li className="confirmation-detailsLink">
                      <h6>Total Cost:</h6>
                    </li>
                    <li className="confirmation-detailsLink">
                      <h6>Payment transaction id:</h6>
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
                      <span>{order.booking_size || "/"}</span>
                    </li>
                    {/* <li className="confirmation-detailsLink">
                      <span>{order.has_mealkit ? "Yes" : "No"}</span>
                    </li> */}

                    <li className="confirmation-detailsLink">
                      <span>
                        {moment
                          .utc(order.booking_datetime)
                          .tz("US/Eastern")
                          .format("dddd, MMMM D, YYYY, hh:mm a")}
                      </span>
                    </li>
                    <li className="confirmation-detailsLink">
                      <span>
                        <a href={order.zoom_link || "/"}>Click here</a>
                      </span>
                    </li>
                    <li className="confirmation-detailsLink">
                      <span>${order.cost || "0"}.00</span>
                    </li>
                    <li className="confirmation-detailsLink">
                      <span>{order._id || "/"}</span>
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
