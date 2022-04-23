import React from 'react';
import { connect } from 'react-redux'

import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import BookingSummary from './components/booking-summary/booking-summary';

import { verifyBookingSuccess } from '../../services/booking-success/actions';

import './booking-success.scss';

/**
 * This component displays the user's full order upon booking success.
 * 
 * This system is responsible for
 *    1. Displaying the user's full order upon booking success
 *    2. Giving the user the option to share their booking confirmation with other emails
 */

class BookingSuccess extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        await this.props.verifyBookingSuccess();
        this.setState({ loading: false });
    }

    render() {
        return (
            <>
                <OrderProgressBar confirmation={true} />
                <BookingSummary loading={this.state.loading} />
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyBookingSuccess: () => dispatch(verifyBookingSuccess())
    }
}

export default connect(null, mapDispatchToProps)(BookingSuccess);