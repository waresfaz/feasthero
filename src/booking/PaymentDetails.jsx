import React from "react";

export default function BookingDetails() {
  return (
    <>
      <div className="step-progressContentBox">
        <div className="stepprogress-modeltext-top-middle">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-10">
              <div className="stepprogress-topmodel text-center">
                <a href="#" className="stepProgressimg">
                  <img src="img/Chef Image.png" alt="" />
                </a>
                <div className="top-model-textbox">
                  <h2>Empanada Extravaganza</h2>
                  <p>
                    Wares' expertise as a chef draw from his extensive
                    experience in
                    <br /> the consumption sector.
                  </p>
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
          <div className="col-xl-6 col-lg-6 col-md-6 pr-55">
            <div className="booking-detailsbox">
              <div className="bookingprocess-title">
                <h2>Payment Details</h2>
              </div>
              <form action="" className="card-form mb-30">
                <div className="card-group">
                  <input
                    type="text"
                    className="conrd-formcontrl"
                    placeholder="Card Number"
                  />
                  <label htmlFor="" className="card-formlebel d-flex">
                    <a href="#" className="addCard-chip">
                      <img src="img/Vector (1).png" alt="" />
                    </a>
                    <a href="#" className="addCard-dateformt">
                      MM / YY CVC
                    </a>
                  </label>
                  <a href="" className="inputbottom-requertext">
                    Transactions are secure and encrypted.
                  </a>
                </div>
              </form>
              <div className="bilinr-addres-box">
                <div className="bilings-title">
                  <h5>Billing Address</h5>
                </div>
                <form action="" className="bilings-addresboc-content">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 p-0">
                      <div className="bilings-group f-nm">
                        <input
                          type="text"
                          className="bilings-control"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 p-0">
                      <div className="bilings-group ls-nm">
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
                          placeholder="Address 1"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <input
                          type="text"
                          className="bilings-control"
                          placeholder="Address 2"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <select
                          name="select"
                          id="country"
                          style={{display: "none"}}
                        >
                          <option value="">Canada</option>
                          <option value="">Canada</option>
                          <option value="">Canada</option>
                          <option value="">Canada</option>
                          <option value="">Canada</option>
                        </select>
                        <div className="nice-select" tabIndex="0">
                          <span className="current">Canada</span>
                          <ul className="list">
                            <li data-value="" className="option selected">
                              Canada
                            </li>
                            <li data-value="" className="option">
                              Canada
                            </li>
                            <li data-value="" className="option">
                              Canada
                            </li>
                            <li data-value="" className="option">
                              Canada
                            </li>
                            <li data-value="" className="option">
                              Canada
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 p-0">
                      <div className="bilings-group postcd">
                        <input
                          type="text"
                          className="bilings-control"
                          placeholder="Postal Code"
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 p-0 ">
                      <div className="bilings-group city">
                        <input
                          type="text"
                          className="bilings-control"
                          placeholder="City"
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 p-0">
                      <div className="bilings-group pro">
                        <select
                          name="select"
                          id="number"
                          style={{display:"none"}}
                        >
                          <option value="">Pro...</option>
                          <option value="">Pro...</option>
                          <option value="">Pro...</option>
                          <option value="">Pro...</option>
                          <option value="">Pro...</option>
                        </select>
                        <div className="nice-select" tabIndex="0">
                          <span className="current">Pro...</span>
                          <ul className="list">
                            <li data-value="" className="option selected">
                              Pro...
                            </li>
                            <li data-value="" className="option">
                              Pro...
                            </li>
                            <li data-value="" className="option">
                              Pro...
                            </li>
                            <li data-value="" className="option">
                              Pro...
                            </li>
                            <li data-value="" className="option">
                              Pro...
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bilings-group">
                        <input
                          type="text"
                          className="bilings-control"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="bookingbtn-group mt-20">
                        <a
                          href="bookingPage-3.html"
                          className="booking-btn btn-str"
                        >
                          Book Class
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
                <h2>Empanada Extravaganza</h2>
              </div>
              <div className="detaislbox-top">
                <p className="set-price">$40 per device</p>
                <div className="weight-ofproduct text-center">
                  <h5>Qty: 1</h5>
                  <a href="#" className="quty-linkupdate">
                    Update
                  </a>
                </div>
              </div>
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
