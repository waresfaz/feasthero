import React from 'react';

import Loader from '../../components/loader/loader';

import { getBookingDetailsFromSession } from '../../services/booking/api';
import history from '../../history';

/**
 * @description hoc that will pass bookingDetails as props
 */

const BookingDetailsFromSession = WrappedComponent => {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                bookingDetails: null,
                error: null,
            }
        }

        async componentDidMount() {
            const bookingDetails = await getBookingDetailsFromSession()

            // session expired
            if (bookingDetails.error === 408) {
                history.push('/');
                return;
            }

            if (bookingDetails.error) {
                this.setState({
                    error: 'Error loading booking details, please try again',
                });
                return;
            }

            this.setState({
                bookingDetails: bookingDetails,
            })
        }

        render() {
            const { bookingDetails, error } = this.state;
            return (
                bookingDetails === null && !error
                    ?
                    <Loader show={bookingDetails === null && !error} />
                    :
                    <WrappedComponent bookingDetails={bookingDetails} error={error} />
            )
        }
    }
}

export default BookingDetailsFromSession