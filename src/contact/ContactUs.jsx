import React, { useState } from "react";
import ContactImg from "../img/Contact Illustravbgtion.png";

export default function ContactUs() {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    console.log("e.target.elements on contact us", e.target.elements)
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };

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
                <form action="" className="contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12">
                      <div className="form-group">
                        <input name="name" type="text" className="form-control" placeholder="Full Name" required />
                        {/* <label htmlFor="name">Full Name</label> */}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                      <div className="form-group">
                        <input name="email" type="email" className="form-control" placeholder="Email Address" required />
                        {/* <label htmlFor="email">Email Address</label> */}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                      <div className="form-group form-textgroup">
                        <textarea
                          name="message"
                          className="form-control text-control"
                          placeholder="Message"
                          id=""
                          cols="10"
                          rows="6"
                         required />
                        {/* <label htmlFor="message">Message</label> */}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                      <div className="btn-group">
                        <button
                          style={{border: "none"}}
                          // href="#"
                          type="submit"
                          className="form-submitebtn btn-str"
                        >
                          Send Message
                        </button>
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
