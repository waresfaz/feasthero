import React from 'react';
import { Col, Row } from 'react-bootstrap';

class BookingSummary extends React.Component {
    render() {
        return (
            <section id='payment-booking-summary'>
                <Row>
                    <Col lg={6}>
                        <h5>Meal Kits</h5>
                    </Col>
                    <Col lg={6}>
                        <h5>{this.props.bookingDetails.mealKitsTotal}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <h5>Number of Meal Kits</h5>
                    </Col>
                    <Col lg={6}>
                        <h5>{this.props.bookingDetails.bookingSize}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <h5>Devices</h5>
                    </Col>
                    <Col lg={6}>
                        <h5>{this.props.bookingDetails.devicesTotal}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <h5>Number of Devices</h5>
                    </Col>
                    <Col lg={6}>
                        <h5>{this.props.bookingDetails.bookingSize}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <h5>Tax</h5>
                    </Col>
                    <Col lg={6}>
                        <h5>{this.props.bookingDetails.tax}</h5>
                    </Col>
                </Row>
            </section>
        );
    }
}

export default BookingSummary;