import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cancelBookingAPI } from "./services/api-service";

export default function Landing() {
  // Moneris will redirect to the home page if a transaction is "cancelled" , and will pass the order_id in the url query string
  let location = useLocation();
  useEffect(() => {
    const cancelBooking = async (order_id) => {
      let result = await cancelBookingAPI(order_id);
    };

    let params = location.search.split("&");
    params = params[0].split("=")[1]; // fetching the cancelled order_id from query string
    if (params !== undefined) {
      // order_id will only be passed in query string if the transaction is cancelled.
      cancelBooking(params);
    }
  }, []);

  return (
    <div className="landing">
      <section className="landing--front">
        <img
          className="logo"
          src="images/logo_transparent_background.png"
          alt=""
        />

        <div className="landing--front--byline">
          <p>Cook together from anywhere</p>
        </div>
      </section>

      <div className="landing--video">
        <div className="landing--color-overlay"></div>
        <video autoPlay loop muted id="video">
          <source src="images/pexels_stir.mp4" type="video/mp4" />
        </video>
      </div>

      <img id="scrolldown" src="images/scroll.gif" alt="" />
    </div>
  );
}
