import React from "react";
import ChefIllustration from "../img/Chef Illustration.png";

export default function Banner() {
  return (
    <div className="bennerslide-section">
      <div className="row align-items-center">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="benner-slidesContent pb-65 pt-65">
            <h2 className="benner-title">
              Cook Together
              <br />
              From Anywhere
            </h2>
            <p className="benner-dummy">
              Learn to cook like a pro with others in
              <br />
              the comfort of your own kitchen.
            </p>
            <a href="bookingPage-1.html" className="benner-bookbtn btn-str">
              Book Class
            </a>
            <a
              href="contactpage.html"
              className="benner-contectbtn btn-strbrand"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <a href="#" className="bennerslides-model">
            <img src={ChefIllustration} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}
