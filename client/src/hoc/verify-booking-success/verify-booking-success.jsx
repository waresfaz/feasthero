import React from 'react';

import Loader from '../../components/loader/loader';

import { verifyBookingSuccess } from '../../services/booking/api';
import { sessionActiveWrapper, statusEnum } from '../../helpers/session-active-wrapper';


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
            const response = await sessionActiveWrapper(verifyBookingSuccess);

            if (response.status === statusEnum.sessionNotActive)
                return;

            if (response.status === statusEnum.error) {
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
                    <WrappedComponent bookingDetails={bookingDetails} classData={classData} verifyBookingSuccessError={error} />
            )
        }
    }
}


export default VerifyBookingSuccess;