import React, { useState } from "react";
import { useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { bookClassAPI } from "../services/api-service";
import BookingDetails from "./BookingDetails";

export default function BookingView() {
  const [stepNumber, setStepNumber] = React.useState(1);
  const [bookingInfo, setBookingInfo] = useState({
    class_id: "",
    customer_email: "",
    mealkit_checked: false,
    customer_first_name: "",
    customer_last_name: "",
    company_name: "",
    booking_size: 8,
    booking_datetime: "",
    cost: 0,
    mealkit_price: 0,
    chef_id: "",
    chef_zoom_link: "",
    chef_email: "",
    chef_photo: "",
    has_mealkit: false,
    chef_details: {},
    class_title: "",
    class_description: "",
  });
  const handleChange = (event) => {
    const value = event.target.value;
    setBookingInfo({
      ...bookingInfo,
      [event.target.name]: value,
    });
  };
  const handleCheckbox = (event) => {
    const value = event.target.checked;
    setBookingInfo({
      ...bookingInfo,
      [event.target.name]: value,
    });
  };
  const [orderError, setorderError] = useState("");
  const [orderId, setorderId] = useState(0);

  const location = useLocation();
  const history = useHistory();

  const errorElement = useRef(null);
  const stepperRef = useRef(null);
  React.useEffect(() => {
    stepperRef.current.scrollIntoView();
  }, [stepperRef]);
  React.useEffect(() => {
    if (orderError.length > 0) {
      errorElement.current.scrollIntoView();
    }
  }, [orderError]);

  React.useEffect(() => {
    if (location.state) {
      const cls = location.state;
      setBookingInfo({
        customer_email: "",
        customer_first_name: "",
        customer_last_name: "",
        company_name: "",
        booking_size: 8,
        booking_datetime: "",
        class_id: cls._id,
        mealkit_price: cls.mealkit_price,
        chef_id: cls.chef_id,
        chef_zoom_link: cls.chefs[0].zoom,
        chef_photo: cls.chefs[0].photo,
        chef_email: cls.chefs[0].email,
        has_mealkit: cls.has_mealkit,
        mealkit_checked: false,
        cost: cls.cost,
        Ucost: cls.cost,
        chef_details: cls.chefs[0],
        class_title: cls.title,
        class_description: cls.description,
      });
      console.log("cls :>> ", cls);
    } else {
      history.push("/");
    }
    stepperRef.current.scrollIntoView();
  }, [location]);

  return (
    <section className="step-progress-section">
      <ul ref={stepperRef} className="stepTop-count mb-25 pt-100">
        <li className="step-progresslink current text-center">
          <span className="number">1</span>
          <h6 className="infotext">Booking Details</h6>
          <span className="progress-line"></span>
        </li>
        <li className="step-progresslink text-center">
          <span className="number">2</span>
          <h6 className="infotext">Payment Details</h6>
          <span className="progress-line"></span>
        </li>
        <li className="step-progresslink text-center">
          <span className="number">3</span>
          <h6 className="infotext">Confirmation</h6>
        </li>
      </ul>

      <h6 ref={errorElement} style={{ color: "#FF5966", textAlign: "center" }}>
        {orderError}
      </h6>
      {bookingInfo.class_id && (
        <BookingDetails
          handleChange={handleChange}
          bookingInfo={bookingInfo}
          handleCheckbox={handleCheckbox}
          setorderId={setorderId}
          orderId={orderId}
          setorderError={setorderError}
        />
      )}
    </section>
  );
}
