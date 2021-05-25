import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import BookingForm from "./BookingForm";
import PaymentForm from "./PaymentForm";

import scheduleHelper from "./helpers/ScheduleHelper";
import handleSubmit from "./helpers/HandleSubmit";
import handleChange from "./helpers/HandleSubmit";
import formReducer from "./helpers/HandleSubmit";
import { useReducer } from "react";

//object destrcutring used here to access props that passed in on Item.js
const Modal = ({ class_id, isShowing, hide, chef, schedule, title, cost, mealkitPrice }) =>
  isShowing
    ? ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal-overlay" />
        <div
          className="modal-wrapper"
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal">
            <div className="modal-header">
              <button
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={hide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <section
              class="step-progress-section"
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
            >

              <ul class="stepTop-count mb-25 pt-100">

                <li class="step-progresslink current text-center">
                  <span class="number">1</span>

                  <h6 class="infotext">Booking Details</h6>
                  <span class="progress-line" />
                </li>

                <li class="step-progresslink text-center">
                  <span class="number">2</span>

                  <h6 class="infotext">Payment Details</h6>
                  <span class="progress-line" />
                </li>

                <li class="step-progresslink text-center">
                  <span class="number">3</span>

                  <h6 class="infotext">Confirmation</h6>
                </li>
              </ul>

              <div class="step-progressContentBox">

                <div class="stepprogress-modeltext-top-middle">

                  <div class="row justify-content-center">

                    <div class="col-xl-10 col-lg-10">

                      <div class="stepprogress-topmodel text-center">
                        <a href="#" class="stepProgressimg"><img src="img/Chef Image.png" alt="" /></a>

                        <div class="top-model-textbox">

                          <h2>{title}</h2>

                          <p>{chef.bio}
                          </p>
                          <a href="#" class="top-modelinklearn">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <form>
                <BookingForm
                  schedule={schedule}
                  class_id={class_id}
                  cost={cost}
                  chef={chef}
                />
              </form>
            </section>
            {/* <div className="modal-content">
                <img className="chef-photo" src={chef.photo} alt="" />
                <h2>
                  {title} with Chef {chef.name}{" "}
                </h2>
                <h5>{chef.bio} </h5>
                <BookingForm
                  schedule={schedule}
                  class_id={class_id}
                  cost={cost}
                  chef={chef}
                />
              </div> */}
          </div>
        </div>
      </React.Fragment>,
      document.body
    )
    : null;

export default Modal;
