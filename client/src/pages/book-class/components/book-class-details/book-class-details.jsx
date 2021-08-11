import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ClassSummary from '../class-summary/class-summary';
import BookingDetails from '../booking-details/booking-details';
import BookingSummary from '../booking-summary/booking-summary';

import './book-class-details.scss';

class BookClassDetails extends React.Component {
  render() {
    const { classData } = this.props;
    return (
      <>
        <ClassSummary classData={classData} chef={classData.chefs[0]} />
        <Row className='justify-content-center' id='booking-container'>
          <Col lg={5}>
            <BookingDetails classData={classData} />
          </Col>
          <Col lg={5}>
            <BookingSummary classData={classData} />
          </Col>
        </Row>
      </>
    )
  }
}

export default BookClassDetails;