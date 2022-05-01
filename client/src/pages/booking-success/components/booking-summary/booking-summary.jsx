import React from 'react';
import Checkmark from '../checkmark/checkmark';
import ShareConfirmation from '../share-confirmation/share-confirmation';
import ConfirmationDetails from '../confirmation-details/confirmation-details';

import { Spinner, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { verifyBookingSuccess } from '../../../../services/booking-success/actions';


class BookingSummary extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        await this.props.verifyBookingSuccess();
        this.setState({ loading: false });
    }

    render() {
        if (this.props.error)
            return <p className='text-center text-danger'>{this.props.error}</p>

        if (this.state.loading)
            return (
                <div className='d-flex justify-content-center'>
                    <Spinner animation='border' />
                </div>
            )

        if (this.props.classData && this.props.bookingDetails)
            return (
                <div id='booking-success'>
                    <div className='text-center'>
                        <Checkmark />
                        <h2 className='mt-2'>Class Booked Successfully!</h2>
                        <p>An email will be sent shortly with your booking confirmation</p>
                    </div>
                    <Container id='booking-success-container'>
                        <ConfirmationDetails classData={this.props.classData} bookingDetails={this.props.bookingDetails} />
                        <ShareConfirmation bookingDetails={this.props.bookingDetails} />
                    </Container>
                </div>
            )

        return <></>
    }
}

const mapStateToProps = (state) => {
    return {
        classData: state.bookingSuccess.classData,
        bookingDetails: state.bookingSuccess.bookingDetails,
        error: state.bookingSuccess.verifyBookingSuccessError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyBookingSuccess: () => dispatch(verifyBookingSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);