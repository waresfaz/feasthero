import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getScheduleAPI } from "../services/api-service";
import scheduleHelper from "../helpers/ScheduleHelper";
const places = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function BookingDetails({ classBooking }) {
  //fetching the classes data from redux
  let data = useSelector((state) => state.class);
  data = data.state.filter((classes) => classes._id === classBooking._id);

  const [checked, setChecked] = useState(false);
  // state to store schedule dates
  const [schedule, setschedule] = useState([]);
  async function getSchedule() {
    let sched = await getScheduleAPI(classBooking._id);
    setschedule(sched.data.data);
    console.log("sched.data.data :>> ", sched.data.data);
  }

  useEffect(() => {
    getSchedule();
  }, []);
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
                    src={classBooking.chefs[0].photo}
                    alt=""
                  />
                </a>
                <div className="top-model-textbox">
                  <h2>{classBooking.title}</h2>
                  <p>{classBooking.description}</p>
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
                <a
                  href="#"
                  className="inforitems"
                  data-tooltip="The number of screens 
            that will be attending 
            the class"
                  data-position="top"
                >
                  <img src="img/Vector.png" alt="" />
                </a>
                <span>Number of devices for booking: </span>
                <select
                  className="custom-select mr-sm-2"
                  id="inlineFormCustomSelect"
                >
                  <option selected value=""></option>
                  {places.map((x, i) => (
                    <option value={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div className="bilinr-addres-box">
                <form action="" className="bilings-addresboc-content">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group ">
                        <select
                          type="text"
                          className="bilings-control custom-select"
                          placeholder="Select Date &amp; Time"
                          defaultValue=""
                        >
                          <option value=""></option>
                          {schedule.length > 0 && scheduleHelper(schedule)}
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <input
                          type="text"
                          className="bilings-control"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <input
                          type="text"
                          className="bilings-control"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <input
                          type="text"
                          className="bilings-control"
                          placeholder="Company Name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <input
                          type="text"
                          className="bilings-control"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bookingbtn-group mt-20">
                        <a
                          href="bookingPage-2.html"
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
                <h2>{classBooking.title}</h2>
              </div>
              <p className="set-price">${classBooking.cost} per device</p>
              {classBooking.has_mealkit && (
                <p className="requer-text">
                  <input type="checkbox" name="" id="" /> Include pre-portioned
                  ingredient kit for class. (4 servings per kit){" "}
                  <span> Additional ${classBooking.mealkit_price}/device.</span>
                </p>
              )}
              <form action="" className="applying-form">
                <input
                  type="text"
                  className="apply-control"
                  placeholder="Discount Code"
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
                    <h6>Ingredient Kit</h6> <span>$0.00</span>
                  </li>
                  <li className="price-listof-text">
                    <h6>Ingredient Kit</h6> <span>$45.00</span>
                  </li>
                  <li className="price-listof-text">
                    <h6>Ingredient Kit</h6> <span>$5.00</span>
                  </li>
                </ul>
                <ul className="price-input-total">
                  <li className="pricetotal-link">
                    <h6>Total</h6> <span>$45.00</span>
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
