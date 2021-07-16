import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import InjectedPaymentForm from './components/payment/payment';
import BookingDetailsFromSession from '../../hoc/booking-details-from-session/booking-details-from-session';
import OrderProgressBar from '../../components/order-progress/order-progress-bar';

import { loadStripe } from "@stripe/stripe-js";

import { settings } from '../../settings';

import './checkout.scss';
import BookingSummary from './components/booking-summary/booking-summary';
import IntervalIsBookingSessionActive from '../../hoc/is-booking-session-active/is-booking-session-active';

/**
 * the checkout page containing a payment component and a booking summary component
 * @since 2.0.0
 */
class Checkout extends React.Component {
    constructor() {
        super();
        this.stripe = loadStripe(settings.STRIPE_PUBLISHABLE_KEY);
    }

    static propTypes = {
        /**
         * if an error occurs when retrieving the booking details
         * from `BookingDetailsFromSession` hoc, an error string will
         * be passed to this component
         */
        error: PropTypes.string,

        /**
         * booking details passed from the `BookingDetailsFromSession` hoc
         */
        bookingDetails: PropTypes.object,
    }

    render() {
        return (
            <>
                <OrderProgressBar paymentDetails />
                {
                    this.props.error
                        ?
                        <h4 className='text-danger text-center'>{this.props.error}</h4>
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


export default IntervalIsBookingSessionActive(BookingDetailsFromSession(Checkout));