import React from 'react';


import ConfirmationDetails from './components/confirmation-details/confirmation-details';
import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import VerifyBookingSuccess from '../../hoc/verify-booking-success/verify-booking-success';

import './booking-success.scss';
import ShareConfirmation from './components/share-confirmation/share-confirmation';
import { Container } from 'react-bootstrap';

/**
 * This component displays the user's full order upon booking success.
 * This component is also wrapped with a HOC that verifies that the user's booking
 * was successful
 * @link https://reactjs.org/docs/higher-order-components.html
 * 
 * This component is responsible for
 *    1. Displaying the user's full order upon booking success
 *    2. Giving the user the option to share their booking confirmation with other emails
 */
class BookingSuccess extends React.Component {
    render() {
        return (
            <>
                <OrderProgressBar confirmation={true} />
                {
                    this.props.verifyBookingSuccessError
                        ?
                        <h4 className='text-danger text-center'>{this.props.verifyBookingSuccessError}</h4>
                        :
                        <div id='booking-success'>
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
                                <h2 className='mt-2'>Class Booked Successfully!</h2>
                                <p>An email will be sent shortly with your booking confirmation</p>
                            </div>
                            <Container id='booking-success-container'>
                                <ConfirmationDetails {...this.props} />
                                <ShareConfirmation />
                            </Container>
                        </div>
                }
            </>
        )
    }
}

export default VerifyBookingSuccess(BookingSuccess);