import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

import './booking-summary.scss';

/**
 * @summary all of the users booking details
 */
class BookingSummary extends React.Component {
    static propTypes = {
        bookingDetails: PropTypes.object,
    }

    render() {
        return (
            <section id='payment-booking-summary'>
                <h4>Booking Summary</h4>
                <div className='summary-divider' />

                {
                    this.props.bookingDetails.mealKitsBooked
                        ?
                        <>
                            <Row>
                                <Col sm={6}>
                                    <h5>Meal Kits</h5>
                                </Col>
                                <Col sm={6}>
                                    <h5>${this.props.bookingDetails.mealKitsTotal}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <h5>Number of Meal Kits</h5>
                                </Col>
                                <Col sm={6}>
                                    <h5>{this.props.bookingDetails.bookingSize}</h5>
                                </Col>
                            </Row>
                            <div className='summary-divider' />
                        </>
                        :
                        <></>
                }

                <Row>
                    <Col sm={6}>
                        <h5>Devices</h5>
                    </Col>
                    <Col sm={6}>
                        <h5>${this.props.bookingDetails.devicesTotal}</h5>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <h5>Number of Devices</h5>
                    </Col>
                    <Col sm={6}>
                        <h5>{this.props.bookingDetails.bookingSize}</h5>
                    </Col>
                </Row>
                <div className='summary-divider' />
                <Row>
                    <Col sm={6}>
                        <h5>Tax</h5>
                    </Col>
                    <Col sm={6}>
                        <h5>${this.props.bookingDetails.tax}</h5>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <h5><b>Grand Total</b></h5>
                    </Col>
                    <Col sm={6}>
                        <h5><b>${this.props.bookingDetails.grandTotal}</b></h5>
                    </Col>
                </Row>
            </section>
        );
    }
}

export default BookingSummary;