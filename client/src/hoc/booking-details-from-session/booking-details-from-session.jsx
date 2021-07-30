import React from 'react';

import Loader from '../../components/loader/loader';

import { getBookingDetailsFromSession } from '../../services/booking/api';
import { sessionActiveWrapper, statusEnum } from '../../helpers/session-active-wrapper';

/**
 * hoc that will pass bookingDetails as props
 */

const BookingDetailsFromSession = WrappedComponent => {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                bookingDetails: undefined,
                error: undefined,
            }
        }

        async componentDidMount() {
            const bookingDetails = await sessionActiveWrapper(getBookingDetailsFromSession);

            if (bookingDetails.status === statusEnum.sessionNotActive)
                return;

            if (bookingDetails.status === statusEnum.error) {
                this.setState({
                    error: 'Error loading booking details, please try again',
                });
                return;
            }

            this.setState({
                bookingDetails: bookingDetails,
            })
        }

        bookingDetailsIsUnanitialized = () => {
            const { bookingDetails, error } = this.state;
            return bookingDetails === undefined && error === undefined
        }

        render() {
            const { bookingDetails, error } = this.state;
            return (
                this.bookingDetailsIsUnanitialized()
                    ?
                    <Loader show={this.bookingDetailsIsUnanitialized()} />
                    :
                    <WrappedComponent bookingDetails={bookingDetails} bookingDetailsFromSessionError={error} />
            )
        }
    }
}

export default BookingDetailsFromSession
