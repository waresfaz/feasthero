import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { Row, Col } from 'react-bootstrap';


import InjectedPaymentForm from './components/payment/payment';
import BookingDetailsFromSession from '../../hoc/booking-details-from-session/booking-details-from-session';
import OrderProgressBar from '../../components/order-progress/order-progress-bar';

import { loadStripe } from "@stripe/stripe-js";

import { settings } from '../../settings';

import './checkout.scss';
import BookingSummary from './components/booking-summary/booking-summary';

/**
 * This component completes the booking that is stored in the client's session.
 * 
 * This component is responsible for
 *    1. Collecting user's payment details as input and uses Stripe to fulfill their booking
 *    2. Display the user's booking details currently stored in their session
 *    3. call the `booking/book` endpoint in order for the booking and payment to be processed
 */
class Checkout extends React.Component {
    constructor() {
        super();
        this.stripe = loadStripe(settings.STRIPE_PUBLISHABLE_KEY);
    }


    render() {
        return (
            <>
                <OrderProgressBar paymentDetails />
                {
                    this.props.bookingDetailsFromSessionError
                        ?
                        <h4 className='text-danger text-center'>{this.props.bookingDetailsFromSessionError}</h4>
                        :
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

                }
            </>
        )
    }
}


export default BookingDetailsFromSession(Checkout);