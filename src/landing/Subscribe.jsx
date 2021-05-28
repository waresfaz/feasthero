import React from "react";
import SubscribeBackground from "../img/Group 77.png";

export default function Subscribe() {
  return (
    <section
      style={{ backgroundImage: `url("${SubscribeBackground}")` }}
      className="chefs-contactSection"
    >
      <div className="chefs-contactBox">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-11 col-md-11">
            <div className="chefs-contentbox-items">
              <div className="row align-items-center">
                <div className="col-xl-5 col-lg-5 col-md-4">
                  <div className="contact-dummy-tect">
                    <h5>Stay in the loop</h5>
                    <p>
                      Be the first to find out about new classes
                      <br /> and updates.
                    </p>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-8">
                  <div className="contactinpur chefs-contact">
                    <form action="" className="contact-form chefs-contact">
                      <div className="form-group chefs-contact">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="mail@example.com"
                        />
                        <label htmlFor="">
                          <a href="#" className="submited-btn">
                            Stay Connected
                          </a>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
