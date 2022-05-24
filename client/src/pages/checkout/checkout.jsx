import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import useFetch from '../../redux/hooks/fetch';
import { loadBookingDetails } from '../../services/checkout/actions';
import { selectBookingDetails } from '../../services/checkout/selectors';
import CheckoutDetails from './components/checkout-details/checkout-details';

/**
 * This component completes the booking that is stored in the client's session.
 * 
 * The checkout system is responsible for
 *    1. Collecting user's payment details as input and uses Stripe to fulfill their booking
 *    2. Display the user's booking details currently stored in their session
 *    3. call the `booking/book` endpoint in order for the booking and payment to be processed
 */

function Checkout(props) {
    const error = useSelector(state => state.checkout.loadBookingDetailsError);
    const bookingDetails = useSelector(selectBookingDetails);
    let checkoutState = <></>;
    const loading = useFetch(loadBookingDetails);

    if (loading)
        checkoutState = (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )
    else if (error)
        checkoutState = <p className='text-center text-danger'>{error}</p>
    else if (bookingDetails)
        checkoutState = <CheckoutDetails {...props} />

    return (
        <>
            <OrderProgressBar paymentDetails />
            {checkoutState}
        </>
    )

}

export default Checkout;