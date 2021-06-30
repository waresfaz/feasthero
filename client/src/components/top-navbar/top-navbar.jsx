import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import logo from '../../assets/resources/images/logo-full.png';

import './top-nav.scss'

class TopNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar id='top-navbar' expand='xl'>
          <Navbar.Brand href="#">
            <img
              src={logo}
              className="d-inline-block align-top"
              alt="FeastHero logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#">Classes</Nav.Link>
              <Nav.Link href="#">How It Works</Nav.Link>
              <Nav.Link href="#">About Us</Nav.Link>
              <Nav.Link href="#">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}

export default TopNavbar;