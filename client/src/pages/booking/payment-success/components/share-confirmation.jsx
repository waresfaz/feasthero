import React from "react";
import { Link } from "react-router-dom";

export default function ShareConfirmation() {
  return (
    <>
      <div class="confirmation-detailstblebox">
        <h5 class="title mb-20">Share confirmation details (optional):</h5>
        <ul class="confirmation-detailstable">
          <li class="confirmation-detailsLink">
            <form action="" class="email-form">
              <div class="email-group">
                <input
                  type="email"
                  class="email-control"
                  placeholder="Email Address"
                />
                <label for="">
                  <span>
                    <i class="fas fa-plus"></i>
                  </span>
                </label>
              </div>
            </form>
          </li>
        </ul>
      </div>
      <div class="sendConfirmation-btnbox text-center">
        <Link to="/" className="send-confirmbtn backhome btn-strbrand">
          Send Confirmation
        </Link>
      </div>
    </>
  );
}
