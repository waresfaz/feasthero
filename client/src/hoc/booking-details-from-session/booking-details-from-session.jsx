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
            }
        }

        async componentDidMount() {
            const bookingDetails = await getBookingDetailsFromSession()

            if (!bookingDetails)
                history.push('/')

            this.setState({
                bookingDetails: bookingDetails,
            })
        }

        render() {
            const { bookingDetails } = this.state;
            return (
                bookingDetails === null
                    ?
                    <Loader show={!bookingDetails} />
                    :
                    bookingDetails === false
                        ?
                        <h4 className='text-danger'>Error loading booking details, please try again</h4>
                        :
                        <WrappedComponent bookingDetails={bookingDetails} />
            )
        }
    }
}

export default BookingDetailsFromSession