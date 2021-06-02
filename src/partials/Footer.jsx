import React from "react";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="row">
        <div className="col-xl-6 col-lg-3 col-md-6">
          <div className="sitelogo-copyright mb-30">
            <a href="#" className="sitefooter-logo">
              <img src="img/FeastHeroLogo 2.png" alt="" />
            </a>
            <p className="site-copyright">
              © 2021 FeastHero.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-2">
          <div className="footer-linkwidgets mb-30">
            <h2 className="footer-widgets-title">Social</h2>
            <ul className="footer-linkwedg">
              <li className="footerlink-items">
                <a href="https://www.facebook.com/feasthero">Facebook</a>
              </li>
              <li className="footerlink-items">
                <a href="https://www.instagram.com/feasthero/">Instagram</a>
              </li>
              <li className="footerlink-items">
                <a href="https://twitter.com/FeastHero">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-2">
          <div className="footer-linkwidgets mb-30">
            <h2 className="footer-widgets-title">Discover</h2>
            <ul className="footer-linkwedg">
              <li className="footerlink-items">
                <a href="/#classlist">All Classes</a>
              </li>
              <li className="footerlink-items">
                <a href="#">About Us</a>
              </li>
              <li className="footerlink-items">
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-2">
          <div className="footer-linkwidgets mb-30">
            <h2 className="footer-widgets-title">Legal</h2>
            <ul className="footer-linkwedg">
              <li className="footerlink-items">
                <a href="#">FAQ</a>
              </li>
              <li className="footerlink-items">
                <a href="#">Terms</a>
              </li>
              <li className="footerlink-items">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
