import React from "react";

import img1 from "../img/matt-seymour-UTCMrSyGHgY-unsplash.png";
import img2 from "../img/max-delsid-0geTqSZ76Xg-unsplash.png";
import img3 from "../img/mariana-medvedeva-iNwCO9ycBlc-unsplash.png";
import img4 from "../img/jimmy-dean-my1mDMraGf0-unsplash.png";
import Vector67 from "../img/Vector 67.png";
import Group71 from "../img/Group 71.png";
import Group from "../img/Group.png";
import { AppendScript } from "../helpers/AppendScript";

export default function ClassFeature() {
  React.useEffect(() => {
    AppendScript("js/isotope.js");
  }, []);
  return (
    <section className="chefs-feature-section" id="feature">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-12 col-md-12 col-12">
          <div
            className="chefs-featureimages grid"
            style={{ position: "relative", height: "532.235px" }}
          >
            <div
              href="#"
              className="feature-image  items-one  grid-item"
              style={{ position: "absolute", left: "0%", top: "0px" }}
            >
              <img src={img1} width="100%" alt="" />
            </div>
            <div
              href="#"
              className="feature-image  items-two  grid-item"
              style={{ position: "absolute", left: "31.7955%", top: "0px" }}
            >
              <img src={img2} width="100%" alt="" />
            </div>
            <div
              href="#"
              className="feature-image  items-three  grid-item"
              style={{ position: "absolute", left: "63.591%", top: "0px" }}
            >
              <img src={img3} width="100%" alt="" />
            </div>
            <div
              href="#"
              className="feature-image  items-four  grid-item"
              style={{ position: "absolute", left: "0%", top: "318.297px" }}
            >
              <img src={img4} width="100%" alt="" />
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-10 col-md-12 col-12">
          <div className="chefs-feature-contentbox">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-title feature text-left">
                  <h2>
                    Try new meals and learn
                    <br /> from experienced chefs
                  </h2>
                </div>
              </div>
            </div>
            <div className="featureChefs-itemsbox">
              <div className="feature-itemcont d-flex align-items-center item-one">
                <a href="#" className="featurechefs-icone">
                  <img src={Vector67} alt="" />
                </a>
                <div className="features-chefscontenttext">
                  <h2>Skip The Grocery Store</h2>
                  <p>
                    Select the option to have ingredients for your class
                    <br /> shipped to you for convenience.
                  </p>
                </div>
              </div>
              <div className="feature-itemcont d-flex align-items-center item-two">
                <a href="#" className="featurechefs-icone">
                  <img src={Group71} alt="" />
                </a>
                <div className="features-chefscontenttext">
                  <h2>Create Connections Virtually</h2>
                  <p>
                    Connecting virtually can be hard. Creating together
                    <br /> allows teams and groups to enjoy a fun evening.
                  </p>
                </div>
              </div>
              <div className="feature-itemcont d-flex align-items-center item-three">
                <a href="#" className="featurechefs-icone">
                  <img src={Group} alt="" />
                </a>
                <div className="features-chefscontenttext">
                  <h2>Learn a New Skill</h2>
                  <p>
                    It doesn’t matter what your knife skills are! Our
                    <br /> cooking classes are made for any skill level.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
