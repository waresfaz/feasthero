import React from 'react';

import Loader from '../../components/loader/loader';

import history from '../../history';
import { verifyBookingSuccess } from '../../services/booking/api';


const VerifyBookingSuccess = WrappedComponent => {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                bookingDetails: null,
                classData: null,
                error: null
            }
        }

        async componentDidMount() {
            const response = await verifyBookingSuccess();

            // session expired
            if (response.error === 408) {
                history.push('/');
                return;
            }
            if (response.error) {
                this.setState({
                    error: 'Error fetching booking details, please contact customer service to make sure your class was placed'
                })
                return;
            }

            const { bookingDetails, classData } = response;

            this.setState({
                bookingDetails: bookingDetails,
                classData: classData,
            })
        }

        render() {
            const { bookingDetails, classData, error } = this.state;
            return (
                bookingDetails === null && !error
                    ?
                    <Loader show={bookingDetails === null && !error} />
                    :
                    <WrappedComponent bookingDetails={bookingDetails} classData={classData} error={error} />
            )
        }
    }
}

export default VerifyBookingSuccess