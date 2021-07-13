import React from 'react';
import { Col, Row } from 'react-bootstrap';

import dateTimeToString from '../../../helpers/date-time-to-string';

class ConfirmationDetails extends React.Component {
    render() {
        const { bookingDetails, classData } = this.props;
        return (
            <>
                <div className='text-center'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fill="green"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <h2>Class Booked Successfully!</h2>
                    <p>An email will be sent shortly with your booking confirmation</p>
                </div>
                <Col md={6}>
                    <Row>
                        <Col md={6}>
                            <h5>First Name:</h5>
                        </Col>
                        <Col md={6}>
                            <h5>{bookingDetails.customerFirstName}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Last Name</h5>
                        </Col>
                        <Col md={6}>
                            <h5>{bookingDetails.customerLastName}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Company Name</h5>
                        </Col>
                        <Col md={6}>
                            <h5>{bookingDetails.companyName}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Number of Devices</h5>
                        </Col>
                        <Col md={6}>
                            <h5>{bookingDetails.bookingSize}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Date and Time</h5>
                        </Col>
                        <Col md={6}>
                            <h5>{dateTimeToString(bookingDetails.selectedClassDateTime)}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Class Zoom Link</h5>
                        </Col>
                        <Col md={6}>
                            <h5><a href={classData.chefs[0].zoom}>{classData.chefs[0].zoom}</a></h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Order ID</h5>
                        </Col>
                        <Col md={6}>
                            <h5>{bookingDetails._id}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Total Cost</h5>
                        </Col>
                        <Col md={6}>
                            <h5>${bookingDetails.grandTotal}</h5>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}


export default ConfirmationDetails;