import React from 'react'
import { Spinner } from 'react-bootstrap';
import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import { sessionActiveWrapper, statusEnum } from '../../helpers/session-active-wrapper';
import { getBookingDetailsFromSession } from '../../services/booking/api';
import CheckoutDetails from './components/checkout-details/checkout-details';

/**
 * This component completes the booking that is stored in the client's session.
 * 
 * The checkout system is responsible for
 *    1. Collecting user's payment details as input and uses Stripe to fulfill their booking
 *    2. Display the user's booking details currently stored in their session
 *    3. call the `booking/book` endpoint in order for the booking and payment to be processed
 */
class Checkout extends React.Component {
    constructor() {
        super();
        this.state = {
            bookingDetails: null,
            error: null,
        }
    }

    async componentDidMount() {
        const bookingDetails = await sessionActiveWrapper(getBookingDetailsFromSession);

        if (bookingDetails.status === statusEnum.sessionNotActive)
            return;

        if (bookingDetails.status === statusEnum.error) {
            this.setState({
                error: 'Error loading booking details, please try again',
            });
            return;
        }

        this.setState({
            bookingDetails: bookingDetails,
        })
    }


    tryToRenderCheckout = () => {
        if (this.state.error)
            return <p className='text-center text-danger'>Error loading checkout details</p>
        if (this.state.bookingDetails)
            return <CheckoutDetails bookingDetails={this.state.bookingDetails} {...this.props} />

        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )
    }

    render() {
        return (
            <>
                <OrderProgressBar paymentDetails />
                {this.tryToRenderCheckout()}
            </>
        )
    }
}

export default Checkout;