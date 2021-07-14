import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';

import { Image } from 'react-bootstrap';

import logo from '../../assets/resources/images/logo-full.png';

import './top-nav.scss'

class TopNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar id='top-navbar' expand='xl'>
          <Link to="/">
            <Image
              src={logo}
              className="d-inline-block align-top"
              alt="FeastHero logo"
            />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link smooth to="/#classes">Classes</Link>
              <Link smooth to="/#how-it-works">How It Works</Link>
              <Link smooth to="/contact">Contact Us</Link>
              <Link smooth to="#">Blog</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}

export default TopNavbar;