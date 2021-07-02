import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';

import bookingdetails from '../../../assets/icons/booking-details.png';
import selectclass from '../../../assets/icons/select-class.png'
import reviewandpay from '../../../assets/icons/review-and-pay.png';

class Steps extends React.Component {
    render() {
        return (
            <section id='steps-to-start'>
                <h2 className='title'>
                    3 Easy Steps to Start
                </h2>
                <Row className='justify-content-around'>
                    <Col md={3}>
                        <Image src={selectclass} />
                        <h4>Select a Class</h4>
                        <p>
                            Select from a variety of classes taught by
                            various chefs and from a range of delicious
                            and easy to create meals
                        </p>
                    </Col>
                    <Col md={3}>
                        <Image src={bookingdetails} />
                        <h4>Enter Booking Details</h4>
                        <p>
                            Enter booking details and select the
                            option of including pre packaged
                            ingredients for your class
                        </p>
                    </Col>
                    <Col md={3}>
                        <Image src={reviewandpay} />
                        <h4>Review and Pay</h4>
                        <p>
                            Review all booking details and get
                            ready for a fun event that your team
                            will love virtually
                        </p>
                        
                    </Col>
                </Row>
            </section>
        )
    }
}

export default Steps;