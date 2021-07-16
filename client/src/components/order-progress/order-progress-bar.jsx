import React from 'react';

import OrderProgressLine from './components/progress-line/order-progress-line';
import OrderProgressCircle from './components/progress-circle/order-progress-circle';

import './order-progress-bar.scss';

/**
 * progress bar to show users where they are in the booking process.
 */
class OrderProgressBar extends React.Component {
    render() {
        return (
            <div id='booking-steps'>
                <OrderProgressLine />
                <OrderProgressCircle active={this.props.bookingDetails ? true : false} step='Booking Details' number={1} />
                <OrderProgressCircle active={this.props.paymentDetails ? true : false} step='Payment Details' number={2} />
                <OrderProgressCircle active={this.props.confirmation ? true : false} step='Confirmation' number={3} />
            </div>
        )
    }
}

export default OrderProgressBar;