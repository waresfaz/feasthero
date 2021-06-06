import React from "react";

import { Route, Switch, useLocation } from "react-router-dom";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import Banner from "./landing/Banner";
import Classes from "./landing/Classes";
import HowItWorks from "./landing/HowItWorks";
import ClassFeature from "./landing/ClassFeature";
import BookingView from "./booking/BookingView";
import Subscribe from "./landing/Subscribe";

import { AppendScript } from "./helpers/AppendScript";
import ContactUs from "./contact/ContactUs";
import PaymentFailureView from "./booking/PaymentFailureView";
import PaymentSuccessView from "./booking/PaymentSuccessView";
import AboutUs from "./about/AboutUs";

// main app function. Everything in the return is what is rendered on the screen
function App() {
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
            render={() => (
              <>
                <Banner />
                <Classes />
                <HowItWorks />
                <ClassFeature />
                <Subscribe />
              </>
            )}
          />
          <Route path="/booking" component={BookingView} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/payment_success" component={PaymentSuccessView} />
          <Route path="/payment_failure" component={PaymentFailureView} />
          <Route path="/aboutus" component={AboutUs} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
