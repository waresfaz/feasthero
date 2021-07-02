import React from "react";
import { Col, Container, Row } from 'react-bootstrap';

import './footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <Container fluid id='footer'>
        <Row>
          <Col md={4}>
            <h5>Social</h5>
          </Col>
          <Col md={4}>
            <h5>Discover</h5>
          </Col>
          <Col md={4}>
            <h5>Legal</h5>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Footer;