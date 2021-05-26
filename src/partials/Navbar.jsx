import React from "react";
import { Link } from "react-router-dom";
import FeastHeroLogo from "../img/FeastHeroLogo 1.png";

export default function Navbar() {
  return (
    <header className="header-section header-sticky">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
          <img src={FeastHeroLogo} alt="" />
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto show">
            <li className="nav-item">
              <Link to="#classlist" className="nav-link active">
                Classes
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#howitwork">
                How It Works
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#feature">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="contactpage.html">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
