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
      <section className="landing--left">

        <p className="landing--left--slogan">Cook together from anywhere</p>
        <p className="landing--left--byline">Learn to cook like a pro with others in the comfort of your own kitchen.</p>  
        <div className="landing--left--buttons"> 
          <button id="book-now">Book Now</button>
          <button id="contact-us">Contact Us</button>
        </div>

      </section>

      <img
        className="landing--image"
        src="rebrand/chef-illustration.png"
        alt=""
      />

    </div>
  );
}
