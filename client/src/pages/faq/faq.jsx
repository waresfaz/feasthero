import React, { useState } from "react";
import ContactImg from "../../assets/Contact Illustravbgtion.png";

export default function Faq() {
  return (
    <div className="conactBox-section">
      <div className="contact-content-box">
        <div className="row">
          {/* <div className="col-xl-6 col-lg-6">
            <div className="contact-modelbox">
              <a href="#" className="model-contactimg">
                <img src={ContactImg} width="100%" alt="" />
              </a>
            </div>
          </div> */}
          {/* <div className="col-xl-6 col-lg-6"> */}
          <div style={{margin: "2%"}}>
            <div className="contact-maincontentbox">
              <div className="contact-toptext">
                <h2 className="contact-title">FAQs</h2>
                <p className="contact-subdummy">
                <h3> Can I cancel my class? </h3>
                  <br /> To request a refund, please email bookings@feasthero.com. Cancellations must be made at least 72 hours before the start of your class. We are unable to issue a refund for any cancellations within 72 hours before the class.
                  <br />
                  <br /> <h3>Can I reschedule my class? </h3>
                  <br />If you would like to reschedule your booking, please email bookings@feasthero.com. Rescheduling can be done any time up to 72 hours before the start of your class. We cannot reschedule your class if it falls within the 72 hour window. 
                  <br />
                  <br /> <h3>Why do I have to cancel/reschedule 72 hours in advance?</h3>
                  <br /> In order for you to receive your mealkits on time, we ship them out to you within 72 hours of your class start time. We require advance notice if we need to cancel your shipments. Our chefs set aside time in their schedules to prepare for, and teach each class. Cancelling on short notice does not provide us an opportunity to reschedule a new class for them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
