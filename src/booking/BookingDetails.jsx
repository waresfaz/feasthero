/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef, createRef } from "react";
import { useSelector } from "react-redux";
import { bookClassAPI, getScheduleAPI } from "../services/api-service";
import scheduleHelper from "../helpers/ScheduleHelper";
import Vector from "../img/Vector.png";
const places = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function BookingDetails({
  bookingInfo,
  handleChange,
  handleCheckbox,
  setorderError,
  setorderId,
  nextStep,
  orderId,
}) {
  //fetching the classes data from redux
  let data = useSelector((state) => state.class);
  data = data.state.filter((classes) => classes._id === bookingInfo.class_id);

  const [checked, setChecked] = useState(false);
  // state to store schedule dates
  const [schedule, setschedule] = useState([]);

  const inputEl = useRef(null);

  async function getSchedule() {
    getScheduleAPI(bookingInfo.class_id).then((res) =>
      setschedule(res.data.data)
    );
    // setschedule(sched.data.data);
  }

  useEffect(() => {
    getSchedule();
  }, []);

  const handleSubmit = async (event) => {
    console.log("bookingInfo :>> ", bookingInfo);
    setorderError("");
    const bookingStatus = await bookClassAPI({
      ...bookingInfo,
      //Calculate Total Cost
      cost: bookingInfo.mealkit_checked
        ? (bookingInfo.mealkit_price + bookingInfo.cost) *
          bookingInfo.booking_size
        : bookingInfo.cost * bookingInfo.booking_size,
      //End
    });
    if (bookingStatus.error === true) {
      setorderError(bookingStatus.data);
      getSchedule(bookingInfo.class_id);
      return false;
    } else {
      setorderId(bookingStatus.data);
      inputEl.current.submit();
    }
  };

  return (
    <>
      <div className="step-progressContentBox">
        <div className="stepprogress-modeltext-top-middle">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-10">
              <div className="stepprogress-topmodel text-center">
                <a href="#" className="stepProgressimg">
                  <img
                    style={{ height: 47, width: 47 }}
                    src={bookingInfo.chef_photo}
                    alt=""
                  />
                </a>
                <div className="top-model-textbox">
                  <h2>{bookingInfo.title}</h2>
                  <p>{bookingInfo.description}</p>
                  <a href="#" className="top-modelinklearn">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="paymentbooking-detailsprocess-box">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="booking-detailsbox">
              <div className="bookingprocess-title">
                <h2>Booking Details</h2>
              </div>
              <div className="info-andselct-box d-flex mb-20">
                {/* <a
                  className="inforitems"
                  data-tooltip="The number of screens 
            that will be attending 
            the class"
                  data-position="top"
                >
                  <img src={Vector} alt="" />
                </a> */}
                <span>Number of devices for booking: </span>
                <select
                  className="custom-select mr-sm-2"
                  id="inlineFormCustomSelect"
                  name="booking_size"
                  value={bookingInfo.booking_size}
                  onChange={handleChange}
                  required
                >
                  {places.map((x, i) => (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bilinr-addres-box">
                <form
                  ref={inputEl}
                  className="modal-form"
                  method="post"
                  action="https://www3.moneris.com/HPPDP/index.php"
                >
                  <input type="hidden" name="ps_store_id" value="GT3RZ41539" />
                  <input type="hidden" name="hpp_key" value="hpEOUYV1I652" />
                  <input
                    type="hidden"
                    name="charge_total"
                    value={
                      bookingInfo.mealkit_checked
                        ? (bookingInfo.mealkit_price + bookingInfo.cost) *
                          bookingInfo.booking_size
                        : bookingInfo.cost * bookingInfo.booking_size
                    }
                  />
                  <input type="hidden" name="order_id" value={orderId} />
                  <input
                    type="hidden"
                    name="class_id"
                    value={bookingInfo.class_id}
                  />
                  <input
                    type="hidden"
                    name="booked_date"
                    value={bookingInfo.booking_datetime}
                  />
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group ">
                        <select
                          name="booking_datetime"
                          type="text"
                          className="bilings-control custom-select"
                          value={bookingInfo.booking_datetime}
                          onChange={handleChange}
                        >
                          <option disabled value="">
                            Select Date &amp; Time
                          </option>
                          {schedule.length > 0 && scheduleHelper(schedule)}
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <input
                          type="text"
                          name="customer_first_name"
                          className="bilings-control"
                          placeholder="First Name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <input
                          name="customer_last_name"
                          type="text"
                          className="bilings-control"
                          placeholder="Last Name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <input
                          name="company_name"
                          type="text"
                          className="bilings-control"
                          placeholder="Company Name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <input
                          name="customer_email"
                          type="email"
                          className="bilings-control"
                          placeholder="Email Address"
                          required
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bookingbtn-group mt-20">
                        <a
                          // href="bookingPage-2.html"
                          style={{ cursor: "pointer" }}
                          onClick={handleSubmit}
                          className="booking-btn btn-str"
                        >
                          Proceed to Payment
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="selingpriceboxdetails">
              <div className="bookingprocess-title">
                <h2>{bookingInfo.title}</h2>
              </div>
              <p className="set-price">${bookingInfo.cost} per device</p>
              {bookingInfo.has_mealkit && (
                <p className="requer-text">
                  <input
                    type="checkbox"
                    onChange={handleCheckbox}
                    checked={bookingInfo.mealkit_checked}
                    name="mealkit_checked"
                  />{" "}
                  Include pre-portioned ingredient kit for class. (4 servings
                  per kit){" "}
                  <span> Additional ${bookingInfo.mealkit_price}/device.</span>
                </p>
              )}
              <form action="" className="applying-form">
                <input
                  type="text"
                  className="apply-control"
                  placeholder="Discount Code"
                  onChange={handleChange}
                />
                <label htmlFor="">
                  <a href="#" className="submite-btn">
                    Apply
                  </a>
                </label>
              </form>
              <div className="price-table-box">
                <ul className="pricetable">
                  <li className="price-listof-text">
                    <h6>Ingredient Kit</h6>{" "}
                    <span>
                      $
                      {bookingInfo.mealkit_checked
                        ? bookingInfo.mealkit_price * bookingInfo.booking_size
                        : "0"}
                      .00
                    </span>
                  </li>
                </ul>
                <ul className="price-input-total">
                  <li className="pricetotal-link">
                    <h6>Total</h6>{" "}
                    <span>
                      $
                      {bookingInfo.mealkit_checked
                        ? (bookingInfo.mealkit_price + bookingInfo.cost) *
                          bookingInfo.booking_size
                        : bookingInfo.cost * bookingInfo.booking_size}
                      .00
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
