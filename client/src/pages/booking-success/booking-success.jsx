import React from 'react';

import ConfirmationDetails from './components/confirmation-details';

import OrderProgressBar from '../../components/order-progress/order-progress-bar';

class BookingSuccess extends React.Component {
    render() {
        return (
            <>
                <OrderProgressBar confirmation={true} />
                <ConfirmationDetails />
            </>
        )
    }
}

export default BookingSuccess;