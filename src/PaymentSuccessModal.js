import React from "react";
import "./PaymentSuccessModal.css";
const PaymentSuccessModal = () => {
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

            <div className="content">
              <h1>Payment Success !</h1>
              <p>
                You will recieve a mail with the details of the scheduled class{" "}
              </p>
              <a href="/">Go to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccessModal;
