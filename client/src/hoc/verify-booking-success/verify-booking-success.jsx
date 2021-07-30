import React from 'react';

import Loader from '../../components/loader/loader';

import { verifyBookingSuccess } from '../../services/booking/api';
import { sessionActiveWrapper, statusEnum } from '../../helpers/session-active-wrapper';


const VerifyBookingSuccess = WrappedComponent => {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                bookingDetails: undefined,
                classData: undefined,
                error: undefined
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

        bookingDetailsAndClassDataAreUninitialized = () => {
            const { bookingDetails, error, classData } = this.state;
            return bookingDetails === undefined && error === undefined && classData === undefined;
        }

        render() {
            const { bookingDetails, classData, error } = this.state;
            return (
                this.bookingDetailsAndClassDataAreUninitialized()
                    ?
                    <Loader show={this.bookingDetailsAndClassDataAreUninitialized()} />
                    :
                    <WrappedComponent bookingDetails={bookingDetails} classData={classData} verifyBookingSuccessError={error} />
            )
        }
    }
}


export default VerifyBookingSuccess;