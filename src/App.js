import React from "react";

import PaymentSuccessModal from "./PaymentSuccessModal";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import PaymentFailureModal from "./PaymentFailureModal";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import Banner from "./landing/Banner";
import Classes from "./landing/Classes";
import HowItWorks from "./landing/HowItWorks";
import ClassFeature from "./landing/ClassFeature";
import BookingView from "./booking/BookingView";
import Subscribe from "./landing/Subscribe";

import { AppendScript } from "./helpers/AppendScript";

// main app function. Everything in the return is what is rendered on the screen
function App() {
  React.useEffect(() => {
    AppendScript("js/main.js");
  }, []);
  return (
    <Router className="main">
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
                {/* <Landing /> */}
                {/* <List /> */}
              </>
            )}
          />
          <Route path="/booking" component={BookingView} />
          <Route path="/payment_success" component={PaymentSuccessModal} />
          <Route path="/payment_failure" component={PaymentFailureModal} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
