import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cancelBookingAPI } from "./services/api-service";
import List from './List';

export default function Nav() {

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

    <body>

      {/* <!--===================================================================
                     Header section     [-START-]
  =====================================================================--> */}
      <header className="header-section header-sticky">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="#"><img src="img/FeastHeroLogo1.png" alt="" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <a className="nav-link" href="#classlist">Classes</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#howitwork">How It Works</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#feature">Features</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="contactpage.html">Contact Us</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/* <!--===================================================================
                     Header section     [-END-]
  =====================================================================--> */}
      {/* <!--===================================================================
                     MainWrapper section     [-START-]
  =====================================================================--> */}

      <div className="minWrapper-box">
        {/* <!--===================================================================
                     benner section     [-START-]
  =====================================================================--> */}

        <div className="bennerslide-section">

          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6 col-md-12">

              <div className="benner-slidesContent pb-65 pt-65">

                <h2 className="benner-title">Cook Together<br />
          From Anywhere</h2>

                <p className="benner-dummy">Learn to cook like a pro with others in<br />
          the comfort of your own kitchen.</p>
                <a href="bookingPage-1.html" className="benner-bookbtn btn-str">Book Class</a>
                <a href="contactpage.html" className="benner-contectbtn btn-strbrand">Contact Us</a>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12">
              <a href="#" className="bennerslides-model"><img src="img/ChefIllustration.png" alt="" /></a>
            </div>
          </div></div>
        {/* <!--===================================================================
                     benner section     [-END-]
  =====================================================================--> */}
        {/* <!--===================================================================
                     class chefs section     [-START-]
  =====================================================================--> */}
 
  <List />

        {/* <!--===================================================================
                     class chefs section     [-END-]
  =====================================================================--> */}
        {/* <!--===================================================================
                   chefs clasPayment section     [-START-]
  =====================================================================--> */}
        <section className="chafsClass-payment-section pt-30" id="howitwork">

          <div className="row">

            <div className="col-xl-12">

              <div className="section-title text-center">

                <h2>3 Easy Steps to Start</h2>
              </div>
            </div>
          </div>

          <div className="payment-step">

            <div className="row">
              {/* <!-- ______________________________________________ --> */}

              <div className="col-xl-4 col-lg-4 col-md-4">

                <div className="chefs-classpayment-detailsbox Select-Class text-center mb-30">
                  <a href="#" className="paymentstep-modelicon"><img src="img/SelectClassIcon.png" alt="" /></a>

                  <div className="chefs-clapaymentext text-center">

                    <h2>Select a Class</h2>

                    <p>Select from a variety of classes taught by<br /> various chefs and from a range of delicious<br /> and easy to create meals</p>
                  </div>
                </div>
              </div>
              {/* <!-- ______________________________________________ --> */}
              {/* <!-- ______________________________________________ --> */}

              <div className="col-xl-4 col-lg-4 col-md-4">

                <div className="chefs-classpayment-detailsbox Book-Class text-center mb-30">
                  <a href="#" className="paymentstep-modelicon"><img src="img/BookDetailsIcon.png" alt="" /></a>

                  <div className="chefs-clapaymentext text-center">

                    <h2>Enter Booking Details</h2>

                    <p>Enter booking details and select the<br /> option of including pre packaged<br /> ingredients for your class</p>
                  </div>
                </div>
              </div>
              {/* <!-- ______________________________________________ --> */}
              {/* <!-- ______________________________________________ --> */}

              <div className="col-xl-4 col-lg-4 col-md-4">

                <div className="chefs-classpayment-detailsbox Select-Class text-center mb-30">
                  <a href="#" className="paymentstep-modelicon"><img src="img/Group66.png" alt="" /></a>

                  <div className="chefs-clapaymentext text-center">

                    <h2>Review and Pay</h2>

                    <p>Review all booking details and get<br /> ready for a fun event that your team<br /> will love virtually</p>
                  </div>
                </div>
              </div>
              {/* <!-- ______________________________________________ --> */}
            </div>
          </div></section>
        {/* <!--===================================================================
                   chefs clasPayment section     [-END-]
  =====================================================================--> */}
        {/* <!--===================================================================
                   chefs clasFeature section     [-START-]
  =====================================================================--> */}
        <section className="chefs-feature-section" id="feature">

          <div className="row justify-content-center">

            <div className="col-xl-6 col-lg-12 col-md-12 col-12">

              <div className="chefs-featureimages grid">
                <a href="#" className="feature-image  items-one  grid-item"><img src="img/matt-seymour-UTCMrSyGHgY-unsplash.png" alt="" width="100%" /></a>
                <a href="#" className="feature-image  items-two  grid-item"><img src="img/max-delsid-0geTqSZ76Xg-unsplash.png" alt="" width="100%" /></a>
                <a href="#" className="feature-image  items-three  grid-item"><img src="img/mariana-medvedeva-iNwCO9ycBlc-unsplash.png" alt="" width="100%" /></a>
                <a href="#" className="feature-image  items-four  grid-item"><img src="img/jimmy-dean-my1mDMraGf0-unsplash.png" alt="" width="100%" /></a>
              </div>
            </div>

            <div className="col-xl-6 col-lg-10 col-md-12 col-12">

              <div className="chefs-feature-contentbox">

                <div className="row">

                  <div className="col-xl-12">

                    <div className="section-title feature text-left">

                      <h2>Try new meals and learn<br /> from experienced chefs</h2>
                    </div>
                  </div>
                </div>

                <div className="featureChefs-itemsbox">

                  <div className="feature-itemcont d-flex align-items-center item-one">
                    <a href="#" className="featurechefs-icone"><img src="img/Vector67.png" alt="" /></a>

                    <div className="features-chefscontenttext">

                      <h2>Skip The Grocery Store</h2>

                      <p>Select the option to have ingredients for your class<br /> shipped to you for convenience.</p>
                    </div>
                  </div>

                  <div className="feature-itemcont d-flex align-items-center item-two">
                    <a href="#" className="featurechefs-icone"><img src="img/Group71.png" alt="" /></a>

                    <div className="features-chefscontenttext">

                      <h2>Create Connections Virtually</h2>

                      <p>Connecting virtually can be hard. Creating together<br /> allows teams and groups to enjoy a fun evening.</p>
                    </div>
                  </div>

                  <div className="feature-itemcont d-flex align-items-center item-three">
                    <a href="#" className="featurechefs-icone"><img src="img/Group.png" alt="" /></a>

                    <div className="features-chefscontenttext">

                      <h2>Learn a New Skill</h2>

                      <p>It doesn’t matter what your knife skills are! Our<br /> cooking classes are made for any skill level.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></section>
        {/* <!--===================================================================
                   chefs classfeature section     [-END-]
  =====================================================================--> */}
        {/* <!--===================================================================
                   chefs chefsContact section     [-START-]
  =====================================================================--> */}
        <section className="chefs-contactSection">

          <div className="chefs-contactBox">

            <div className="row justify-content-center">

              <div className="col-xl-8 col-lg-11 col-md-11">

                <div className="chefs-contentbox-items">

                  <div className="row align-items-center">

                    <div className="col-xl-5 col-lg-5 col-md-4">

                      <div className="contact-dummy-tect">

                        <h5>Stay in the loop</h5>

                        <p>Be the first to find out about new classes<br /> and updates. </p>
                      </div>
                    </div>

                    <div className="col-xl-7 col-lg-7 col-md-8">

                      <div className="contactinpur chefs-contact">
                        <form action="" className="contact-form chefs-contact">

                          <div className="form-group chefs-contact">
                            <input type="text" className="form-control" placeholder="mail@example.com" />
                            <label for=""><a href="#" className="submited-btn">Stay Connected</a></label>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!--===================================================================
                   chefs chefsContact section     [-END-]
  =====================================================================--></div> */}
        {/* <!--===================================================================
                     MainWrapper section     [-END-]
  =====================================================================--> */}
        {/* <!--===================================================================
                     Footer section     [-START-]
  =====================================================================--> */}
        <footer className="footer-section">

          <div className="row">

            <div className="col-xl-6 col-lg-3 col-md-6">

              <div className="sitelogo-copyright mb-30">
                <a href="#" className="sitefooter-logo"><img src="img/FeastHeroLogo2.png" alt="" /></a>

                <p className="site-copyright">© 2021 FeastHero.<br />All rights reserved. </p>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-md-2">

              <div className="footer-linkwidgets mb-30">

                <h2 className="footer-widgets-title">Social</h2>

                <ul className="footer-linkwedg">

                  <li className="footerlink-items"><a href="#">Facebook</a></li>

                  <li className="footerlink-items"><a href="#">Instagram</a></li>

                  <li className="footerlink-items"><a href="#">Twitter</a></li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-md-2">

              <div className="footer-linkwidgets mb-30">

                <h2 className="footer-widgets-title">Discover</h2>

                <ul className="footer-linkwedg">

                  <li className="footerlink-items"><a href="#">All Classes</a></li>

                  <li className="footerlink-items"><a href="#">About Us</a></li>

                  <li className="footerlink-items"><a href="#">Contact Us</a></li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-md-2">

              <div className="footer-linkwidgets mb-30">

                <h2 className="footer-widgets-title">Legal</h2>

                <ul className="footer-linkwedg">

                  <li className="footerlink-items"><a href="#">FAQ</a></li>

                  <li className="footerlink-items"><a href="#">Terms</a></li>

                  <li className="footerlink-items"><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        {/* <!--===================================================================
                     Footer section     [-END-]
  =====================================================================--> */}
      </div>
      </body>
  );
}