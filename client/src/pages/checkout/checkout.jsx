import React from 'react'
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import { loadBookingDetails } from '../../services/checkout/actions';
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
    async componentDidMount() {
        await this.props.loadBookingDetails();
    }


    tryToRenderCheckout = () => {
        if (this.props.error)
            return <p className='text-center text-danger'>{this.props.error}</p>
        if (this.props.bookingDetails)
            return <CheckoutDetails bookingDetails={this.props.bookingDetails} {...this.props} />

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

const mapStateToProps = (state) => {
    return {
        bookingDetails: state.checkout.bookingDetails,
        error: state.checkout.loadBookingDetailsError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBookingDetails: () => dispatch(loadBookingDetails()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);