import React from "react";
import ContactImg from "../img/Contact Illustravbgtion.png";

export default function ContactUs() {
  return (
    <div className="conactBox-section">
      <div className="contact-content-box">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="contact-modelbox">
              <a href="#" className="model-contactimg">
                <img src={ContactImg} width="100%" alt="" />
              </a>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="contact-maincontentbox">
              <div className="contact-toptext">
                <h2 className="contact-title">Get in Touch</h2>
                <p className="contact-subdummy">
                  Have any inquiries about our
                  <br /> classes? Fill out the form below to
                  <br /> contact our team.
                </p>
              </div>
              <div className="form-box">
                <form action="" className="contact-form">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12">
                      <div className="form-group">
                        <input type="text" className="form-control" />
                        <label htmlFor="">Full Name</label>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                      <div className="form-group">
                        <input type="text" className="form-control" />
                        <label htmlFor="">Email Address</label>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                      <div className="form-group form-textgroup">
                        <textarea
                          className="form-control text-control"
                          name=""
                          id=""
                          cols="10"
                          rows="6"
                        ></textarea>
                        <label htmlFor="">Message</label>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                      <div className="btn-group">
                        <a
                          href="#"
                          type="submit"
                          className="form-submitebtn btn-str"
                        >
                          Send Message
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
