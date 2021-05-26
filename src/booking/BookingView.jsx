import React from "react";
import { useLocation, useParams } from "react-router";
import BookingDetails from "./BookingDetails";
import Confirmation from "./Confirmation";
import PaymentDetails from "./PaymentDetails";

export default function BookingView() {
  const [step, setStep] = React.useState(1);
  const [classBooking, setClassBooking] = React.useState(null);

  const location = useLocation();
  React.useEffect(() => {
    console.log(location.state);
    if (location.state) {
      setClassBooking({ ...location.state });
    }
  }, [location]);

  return (
    <section className="step-progress-section">
      <ul className="stepTop-count mb-25 pt-100">
        <li
          className={`step-progresslink ${
            step === 1 ? "current" : ""
          } text-center`}
        >
          <span className="number">1</span>
          <h6 className="infotext">Booking Details</h6>
          <span className="progress-line"></span>
        </li>
        <li
          className={`step-progresslink ${
            step === 2 ? "current" : ""
          } text-center`}
        >
          <span className="number">2</span>
          <h6 className="infotext">Payment Details</h6>
          <span className="progress-line"></span>
        </li>
        <li
          className={`step-progresslink ${
            step === 3 ? "current" : ""
          } text-center`}
        >
          <span className="number">3</span>
          <h6 className="infotext">Confirmation</h6>
        </li>
      </ul>
      {step === 1 ? (
        classBooking && <BookingDetails classBooking={classBooking} />
      ) : step === 2 ? (
        <PaymentDetails />
      ) : (
        <Confirmation />
      )}
    </section>
  );
}
