import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { Row, Col } from 'react-bootstrap';
import { loadStripe } from "@stripe/stripe-js";

import { settings } from '../../../../settings';

import InjectedPaymentForm from '../payment/payment';
import BookingSummary from '../booking-summary/booking-summary';

import './checkout-details.scss';


class CheckoutDetails extends React.Component {
    constructor() {
        super();
        this.stripe = loadStripe(settings.STRIPE_PUBLISHABLE_KEY);
    }

    render() {
        return (
            <>
                <Row className='justify-content-around'>
                    <Col lg={4} id='payment-col'>
                        <Elements stripe={this.stripe}>
                            <InjectedPaymentForm bookingDetails={this.props.bookingDetails} />
                        </Elements>
                    </Col>
                    <Col lg={5}>
                        <BookingSummary bookingDetails={this.props.bookingDetails} />
                    </Col>
                </Row>
            </>
        )
    }
}


export default CheckoutDetails;