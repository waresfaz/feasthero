import React from "react";

import { Route, Switch, useLocation } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import BookingView from "../../pages/booking/booking/start-booking";

import { AppendScript } from "../../helpers/append-script";
import ContactUs from "../../pages/contact/contact-us";
import PaymentFailureView from "../../pages/booking/payment-failed/payment-failed";
import PaymentSuccessView from "../../pages/booking/payment-success/payment-success";
import AboutUs from "../../pages/about/about-us";
import Faq from "../../pages/faq/faq";
import Landing from '../../pages/landing/landing';
import { initSettings } from '../../settings';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';

// main app function. Everything in the return is what is rendered on the screen
function App() {
  initSettings();
  
  const location = useLocation();
  React.useEffect(() => {
    AppendScript("js/main.js");
  }, []);
  React.useEffect(() => {
    if (location.hash) {
      let elmnt = document.getElementById(
        location.hash.substring(1, location.hash.length)
      );
      if (elmnt) {
        elmnt.scrollIntoView();
      }
    }
  }, [location]);
  return (
    <>
      <Navbar />
      <div className="minWrapper-box">
        <Switch>
          <Route
            exact
            path="/"
            component={Landing}
          />
          <Route path="/booking" component={BookingView} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/payment_success" component={PaymentSuccessView} />
          <Route path="/payment_failure" component={PaymentFailureView} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/faq" component={Faq} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
