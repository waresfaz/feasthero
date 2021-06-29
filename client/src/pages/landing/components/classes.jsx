/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../../services/class/actions";
import { useHistory } from "react-router-dom";
import Vector2 from "../../../assets/Vector (2).png";

const Classes = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let data = useSelector((state) => state.class);

  React.useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const classesList =
    data.state &&
    data.state.map((classes, k) => {
      const title = classes.title;
      const thumbnail = classes.thumbnail;
      const cost = classes.cost;
      const description = classes.description;
      const duration = classes.duration;
      const chef = classes.chefs[0];
      const schedule = classes.schedule;
      const chef_id = classes.chef_id;

      // console.log('here is tehd atteime', schedule)

      return (
        <div key={k} className="col-xl-6 col-lg-6 col-md-6 col-12">
          <div className="classDetails-contentitem mb-30">
            <a href="#" className="classdetaisl-itemmodel">
              <img src={thumbnail} width="100%" alt="" />
            </a>
            <div className="chefsclass-contentbox">
              <div className="clasdetailsbox d-flex align-items-center justify-content-between">
                <div className="chefs-avatrdetails d-flex align-items-center">
                  <a href="#" className="chefs-img">
                    <img
                      style={{
                        width: 47,
                        height: 47,
                      }}
                      src={chef.photo}
                      alt=""
                    />
                  </a>
                  <div className="chefs-claseshover-overflow d-flex">
                    <a href="#" className="chefs-img"></a>
                    <a href="#" className="avatar-hoveroverly">
                      <img
                        style={{
                          width: 163,
                          hegiht: 155,
                        }}
                        src={chef.photo}
                        alt=""
                      />
                    </a>
                    <div className="hover-overlyntextChefs">
                      <h3>{chef.name}</h3>
                      <p>{chef.bio}</p>
                    </div>
                  </div>

                  <div className="chefs-svadetiltext">
                    <h5 className="chefs-clasname">{title}</h5>
                    <h6 className="chefs-clasdetaisltext">
                      <span>
                        {duration} Hrs | ${cost}
                      </span>{" "}
                      per device
                    </h6>
                  </div>
                </div>
                <a
                  onClick={() =>
                    history.push({
                      pathname: "/booking",
                      state: { ...classes },
                    })
                  }
                  style={{ cursor: "pointer" }}
                  className="booking-btn chefs-btn"
                >
                  Book Now
                  <span>
                    <img src={Vector2} alt="" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <section className="classchefsDetails-section">
      <div className="row">
        <div className="col-xl-12">
          <div className="section-title text-center">
            <h2 id="classlist">Hands-on cooking classes taught by world class chefs</h2>
          </div>
        </div>
      </div>
      <div className="chefs-classdetails-box">
        <div className="row">
          {classesList ? classesList : <h1>Loading classes ...</h1>}
        </div>
      </div>
    </section>
  );
};

export default Classes;
