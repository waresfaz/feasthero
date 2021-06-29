import React from "react";
import SelectaClass from "../../../assets/Select Class Icon.png";
import EnterBookingDetails from "../../../assets/Book Details Icon.png";
import Group66 from "../../../assets/Group 66.png";

export default function HowItWorks() {
  return (
    <section className="chafsClass-payment-section pt-30" id="howitworks">
      <div className="row">
        <div className="col-xl-12">
          <div className="section-title text-center">
            <h2>3 Easy Steps to Start</h2>
          </div>
        </div>
      </div>
      <div className="payment-step">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="chefs-classpayment-detailsbox Select-Class text-center mb-30">
              <a href="#" className="paymentstep-modelicon">
                <img src={SelectaClass} alt="" />
              </a>
              <div className="chefs-clapaymentext text-center">
                <h2>Select a Class</h2>
                <p>
                  Select from a variety of classes taught by
                  <br /> various chefs and from a range of delicious
                  <br /> and easy to create meals
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="chefs-classpayment-detailsbox Book-Class text-center mb-30">
              <a href="#" className="paymentstep-modelicon">
                <img src={EnterBookingDetails} alt="" />
              </a>
              <div className="chefs-clapaymentext text-center">
                <h2>Enter Booking Details</h2>
                <p>
                  Enter booking details and select the
                  <br /> option of including pre packaged
                  <br /> ingredients for your class
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="chefs-classpayment-detailsbox Select-Class text-center mb-30">
              <a href="#" className="paymentstep-modelicon">
                <img src={Group66} alt="" />
              </a>
              <div className="chefs-clapaymentext text-center">
                <h2>Review and Pay</h2>
                <p>
                  Review all booking details and get
                  <br /> ready for a fun event that your team
                  <br /> will love virtually
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
