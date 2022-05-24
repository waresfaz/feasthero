import React from 'react';
import Checkmark from '../checkmark/checkmark';
import ShareConfirmation from '../share-confirmation/share-confirmation';
import ConfirmationDetails from '../confirmation-details/confirmation-details';

import { Spinner, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { verifyBookingSuccess } from '../../../../services/booking-success/actions';
import { selectBookingDetails, selectCurrentClass } from '../../../../services/booking-success/selectors';
import useFetch from '../../../../redux/hooks/fetch';

function BookingSummary() {
    const error = useSelector(state => state.bookingSuccess.verifyBookingSuccessError);
    const classData = useSelector(selectCurrentClass);
    const bookingDetails = useSelector(selectBookingDetails);

    const loading = useFetch(verifyBookingSuccess);

    if (error)
        return <p className='text-center text-danger'>{error}</p>

    if (loading)
        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )

    if (classData && bookingDetails)
        return (
            <div id='booking-success'>
                <div className='text-center'>
                    <Checkmark />
                    <h2 className='mt-2'>Class Booked Successfully!</h2>
                    <p>An email will be sent shortly with your booking confirmation</p>
                </div>
                <Container id='booking-success-container'>
                    <ConfirmationDetails />
                    <ShareConfirmation />
                </Container>
            </div>
        )

    return <></>
}

export default BookingSummary;