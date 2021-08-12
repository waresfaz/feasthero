import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

import { verifyBookingSuccess as verifyBookingSuccessRequest } from '../../services/booking/api';
import { sessionActiveWrapper, statusEnum } from '../../helpers/session-active-wrapper';

import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import Checkmark from './components/checkmark/checkmark';
import ShareConfirmation from './components/share-confirmation/share-confirmation';
import ConfirmationDetails from './components/confirmation-details/confirmation-details';

import './booking-success.scss';

/**
 * This component displays the user's full order upon booking success.
 * @link https://reactjs.org/docs/higher-order-components.html
 * 
 * This system is responsible for
 *    1. Displaying the user's full order upon booking success
 *    2. Giving the user the option to share their booking confirmation with other emails
 */
class BookingSuccess extends React.Component {
    constructor() {
        super();
        this.state = {
            bookingDetails: undefined,
            classData: undefined,
            error: undefined
        }
    }

    async componentDidMount() {
        await this.verifyBookingSuccess();
    }

    verifyBookingSuccess = async () => {
        const response = await sessionActiveWrapper(verifyBookingSuccessRequest);

        if (response.status === statusEnum.sessionNotActive)
            return;

        if (response.status === statusEnum.error) {
            this.setState({
                error: 'Error fetching booking details, please contact customer service to make sure your class was placed'
            })
            return;
        }

        const { bookingDetails, classData } = response;

        this.setState({
            bookingDetails: bookingDetails,
            classData: classData,
        })
    }

    dataHasLoaded = () => {
        return this.state.bookingDetails && this.state.classData;
    }

    tryToRenderBookingSuccess = () => {
        if (this.state.error)
            return <p className='text-center text-danger'>{this.state.error}</p>
        if (this.dataHasLoaded())
            return (
                <div id='booking-success'>
                    <div className='text-center'>
                        <Checkmark />
                        <h2 className='mt-2'>Class Booked Successfully!</h2>
                        <p>An email will be sent shortly with your booking confirmation</p>
                    </div>
                    <Container id='booking-success-container'>
                        <ConfirmationDetails classData={this.state.classData} bookingDetails={this.state.bookingDetails} />
                        <ShareConfirmation bookingDetails={this.state.bookingDetails} />
                    </Container>
                </div>
            )

        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )
    }

    render() {
        return (
            <>
                <OrderProgressBar confirmation={true} />
                {this.tryToRenderBookingSuccess()}
            </>
        )
    }
}



export default BookingSuccess;