import React from 'react';

import { verifyBookingSuccess as verifyBookingSuccessRequest } from '../../services/booking/api';
import { sessionActiveWrapper, statusEnum } from '../../helpers/session-active-wrapper';
import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import BookingSuccessDetails from './components/booking-success-details/booking-success-details';
import { Spinner } from 'react-bootstrap';

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

    tryToRenderBookingSuccessDetails = () => {
        if (this.state.error)
            return <p className='text-center text-danger'>{this.state.error}</p>
        if (this.dataHasLoaded())
            return <BookingSuccessDetails classData={this.state.classData} bookingDetails={this.state.bookingDetails} {...this.props} />

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
                {this.tryToRenderBookingSuccessDetails()}
            </>
        )
    }
}



export default BookingSuccess;