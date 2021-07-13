import React from 'react';

import Loader from '../../../components/loader/loader';

import history from '../../../history';
import { verifyBookingSuccess } from '../../../services/booking/api';

class ConfirmationDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            bookingDetails: {}
        }
    }

    async componentDidMount() {
        const bookingDetails = await verifyBookingSuccess();
        if (!bookingDetails) {
            history.push('/');
            return
        }
        this.setState({
            bookingDetails: bookingDetails,
        })
    }

    render() {
        const { bookingDetails } = this.state;
        return (
            <>
                <Loader show={!bookingDetails} />
                {
                    bookingDetails
                        ?
                        <>
                            {bookingDetails.bookingSize}
                        </>
                        :
                        <></>
                }
            </>
        );
    }
}


export default ConfirmationDetails;