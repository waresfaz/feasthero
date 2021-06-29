import React, { useState } from "react";
import ContactImg from "../img/Contact Illustravbgtion.png";

export default function AboutUs() {
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
                <h2 className="contact-title">About Us</h2>
                <p className="contact-subdummy">
                Hey there! We’re FeastHero,
                  <br /> a brand new start-up in Toronto that offers online group cooking classes by local chefs primarily to organizations that are looking for virtual team engagement opportunities for their remote workforce. 
                  <br />
                  <br />We’re also available for private groups of 5 or more if you and your friends are looking for something fun to do together in the comfort of your own homes. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
