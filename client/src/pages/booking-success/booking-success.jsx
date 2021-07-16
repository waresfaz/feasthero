import React from 'react';

import checkSessionActive from '../../helpers/check-session-active';

import ConfirmationDetails from './components/confirmation-details';
import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import VerifyBookingSuccess from '../../hoc/verify-booking-success/verify-booking-success';

class BookingSuccess extends React.Component {
    componentDidMount() {
        this.sessionCheck = setInterval(checkSessionActive, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.sessionCheck);
    }


    render() {
        return (
            <>
                <OrderProgressBar confirmation={true} />
                {
                    this.props.error
                        ?
                        <h4 className='text-danger text-center'>{this.props.error}</h4>
                        :
                        <ConfirmationDetails {...this.props} />
                }
            </>
        )
    }
}

export default VerifyBookingSuccess(BookingSuccess);