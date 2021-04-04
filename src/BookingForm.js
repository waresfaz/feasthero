import { useState, useRef, useEffect } from "react";
import scheduleHelper from "./helpers/ScheduleHelper";
import { bookClassAPI, getScheduleAPI } from "./services/api-service";
import { useSelector, useDispatch } from "react-redux";

export default function BookingForm({ class_id, cost, chef }) {
  //fetching the classes data from redux
  let data = useSelector((state) => state.class);
  data = data.state.filter((classes) => classes._id == class_id);

  const [checked, setChecked] = useState(false);
  // state to store schedule dates
  const [schedule, setschedule] = useState([]);
  async function getSchedule() {
    let sched = await getScheduleAPI(class_id);
    setschedule(sched.data.data);
  }

  useEffect(() => {
    getSchedule();
  }, []);

  const inputEl = useRef(null);

  // To set any error upon clicking "Proceed to payment "
  const [orderError, setorderError] = useState(false);
  const [orderId, setorderId] = useState(0);

  // to be passed to backend API
  const [bookingInfo, setBookingInfo] = useState({
    class_id: class_id,
    customer_email: "",
    customer_first_name: "",
    customer_last_name: "",
    company_name: "",
    booking_size: 0,
    booking_datetime: "",
    cost: 0,
    mealkit_price: 0,
    chef_id: chef._id,
    chef_zoom_link: chef.zoom,
    chef_email: chef.email,
    has_mealkit: false,
  });

  // submit the form , will redirect to moneris
  const handleSubmit = async (event) => {
    const bookingStatus = await bookClassAPI(bookingInfo);
    if (bookingStatus.error == true) {
      setorderError(bookingStatus.data);
      getSchedule(class_id);
      return false;
    } else {
      setorderId(bookingStatus.data);
      inputEl.current.submit();
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setBookingInfo({
      ...bookingInfo,
      [event.target.name]: value,
    });
  };
  return (
    <form
      ref={inputEl}
      className="modal-form"
      method="post"
      action="https://esqa.moneris.com/HPPDP/index.php"
    >
      <input type="hidden" name="ps_store_id" value="CVQNQtore1"></input>
      <input type="hidden" name="hpp_key" value="hpB9RYVYPULN"></input>
      <input
        type="hidden"
        name="charge_total"
        value={bookingInfo.cost.toString() + ".0"}
      ></input>
      <input type="hidden" name="order_id" value={orderId}></input>
      <input type="hidden" name="class_id" value={class_id}></input>
      <input
        type="hidden"
        name="booked_date"
        value={bookingInfo.booking_datetime}
      ></input>
      <div className="booking-input-section">
        <h4>How many people are you booking for?</h4>
        <input
          onChange={(e) => {
            setBookingInfo({
              ...bookingInfo,
              booking_size: e.target.value,
              cost:
                bookingInfo.mealkit_price * e.target.value +
                cost * e.target.value,
            });
          }}
          name="booking_size"
          type="number"
          id="booking-size-input"
          className="booking-input"
          min="8"
          max="20"
          placeholder="8-20"
          required
        />
      </div>
      <div className="booking-input-section">
        <h4>Select a booking date &amp; time:</h4>

        <select
          onChange={handleChange}
          name="booking_datetime"
          id="booking-datetime-input"
          className="booking-input"
          required
        >
          <option value=""> Select </option>
          {schedule.length > 0 && scheduleHelper(schedule)}
        </select>

        {orderError && <span style={{ color: "red" }}> {orderError}</span>}
      </div>
      <input
        type="text"
        className="first-name"
        placeholder="First Name"
        name="customer_first_name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        className="last-name"
        placeholder="Last Name"
        name="customer_last_name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        className="company-name"
        placeholder="Company Name"
        name="company_name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        className="email-address"
        name="customer_email"
        onChange={handleChange}
        placeholder="Email Address"
        required
      />
      {data[0].has_mealkit && (
        <h4>
          {" "}
          Do you want to purchase meal kit? (${data[0].mealkit_price}/person) :
          <input
            type="checkbox"
            name="has_mealkit"
            value={!checked}
            onChange={(e) => {
              setChecked((old) => !old);
              let price =
                bookingInfo.cost +
                bookingInfo.booking_size * data[0].mealkit_price;
              let meal = data[0].mealkit_price;
              if (e.target.value == "false") {
                price =
                  bookingInfo.cost -
                  bookingInfo.booking_size * data[0].mealkit_price;
                meal = 1;
              }
              setBookingInfo({
                ...bookingInfo,
                has_mealkit: e.target.value,
                cost: price,
                mealkit_price: meal,
              });
            }}
          />{" "}
          Yes
        </h4>
      )}
      <h2>Total cost: ${bookingInfo.cost}</h2>
      <input
        type="button"
        onClick={handleSubmit}
        className="submit-booking-form"
        value="Proceed to Payment"
      />
    </form>
  );
}
