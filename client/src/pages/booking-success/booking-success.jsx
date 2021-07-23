import React from 'react';


import ConfirmationDetails from './components/confirmation-details';
import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import VerifyBookingSuccess from '../../hoc/verify-booking-success/verify-booking-success';

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
                        <ConfirmationDetails {...this.props} />
                }
            </>
        )
    }
}

export default VerifyBookingSuccess(BookingSuccess);