import React from 'react';
import { connect } from 'react-redux';
import { Spinner, Row, Col } from 'react-bootstrap';

import { clearBookingErrors, getClassDataForBooking, reset, updateBookingDetails } from '../../services/booking/actions';

import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import BookingDetails from './components/booking-details/booking-details';
import BookingSummary from './components/booking-summary/booking-summary';
import ClassSummary from './components/class-summary/class-summary';

import './book-class.scss'

/**
 * This component gathers the information needed to start a booking.
 * 
 * This system is responsible for
 *    1. Collecting user's booking details as input
 *    2. Displaying the user's current entered booking details
 *    3. Call the `booking/init-session` endpoint in order for the inputted booking
 *       details to be added to the client's session for future use
 * 
 * A session is a way to persistently store data belonging to a client on the server.
 * @link https://en.wikipedia.org/wiki/Session_(computer_science)
 */


class BookClass extends React.Component {
    async componentDidMount() {
        this.props.reset();
        await this.props.getClassData(this.props.match.params.id);
        this.props.updateBookingDetails({ classId: this.props.match.params.id });
    }

    componentWillUnmount() {
        this.props.clearBookingErrors();
    }

    tryToRenderBooking() {
        const { loading, errorLoadingClassData } = this.props;

        if (loading) {
            return (
                <div className='d-flex justify-content-center'>
                    <Spinner animation='border' />
                </div>
            )
        }

        if (errorLoadingClassData)
            return <p className='text-danger text-center'>Error loading class</p>

        return (
            <>
                <ClassSummary />
                <Row className='justify-content-center' id='booking-container'>
                    <Col lg={5}>
                        <BookingDetails />
                    </Col>
                    <Col lg={5}>
                        <BookingSummary />
                    </Col>
                </Row>
            </>
        )
    }

    render() {
        return (
            <>
                <OrderProgressBar bookingDetails />
                {this.tryToRenderBooking()}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.booking.loadingClassData,
        errorLoadingClassData: state.booking.errorLoadingClassData,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        reset: () => dispatch(reset()),
        getClassData: (classId) => dispatch(getClassDataForBooking(classId)),
        clearBookingErrors: () => dispatch(clearBookingErrors()),
        updateBookingDetails: (bookingDetails) => dispatch(updateBookingDetails(bookingDetails)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookClass);