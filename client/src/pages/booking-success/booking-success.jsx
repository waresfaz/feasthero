import React from 'react';
import { Spinner, Container } from 'react-bootstrap';
import { connect } from 'react-redux'

import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import Checkmark from './components/checkmark/checkmark';
import ShareConfirmation from './components/share-confirmation/share-confirmation';
import ConfirmationDetails from './components/confirmation-details/confirmation-details';

import './booking-success.scss';
import { verifyBookingSuccess } from '../../services/booking-success/actions';

/**
 * This component displays the user's full order upon booking success.
 * 
 * This system is responsible for
 *    1. Displaying the user's full order upon booking success
 *    2. Giving the user the option to share their booking confirmation with other emails
 */

class BookingSuccess extends React.Component {
    componentDidMount() {
        this.props.verifyBookingSuccess();
    }

    dataHasLoaded = () => {
        return this.props.bookingDetails && this.props.classData;
    }

    tryToRenderBookingSuccess = () => {
        if (this.props.error)
            return <p className='text-center text-danger'>{this.props.error}</p>
        if (this.dataHasLoaded())
            return (
                <div id='booking-success'>
                    <div className='text-center'>
                        <Checkmark />
                        <h2 className='mt-2'>Class Booked Successfully!</h2>
                        <p>An email will be sent shortly with your booking confirmation</p>
                    </div>
                    <Container id='booking-success-container'>
                        <ConfirmationDetails classData={this.props.classData} bookingDetails={this.props.bookingDetails} />
                        <ShareConfirmation bookingDetails={this.props.bookingDetails} />
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

const mapStateToProps = (state) => {
    return {
        classData: state.bookingSuccess.classData,
        bookingDetails: state.bookingSuccess.bookingDetails,
        error: state.bookingSuccess.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyBookingSuccess: () => dispatch(verifyBookingSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSuccess);