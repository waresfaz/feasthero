import React from 'react';
import { connect } from 'react-redux';
import { Spinner, Row, Col } from 'react-bootstrap';
import datesTimesAsOption from '../../helpers/dates-times-as-options';
import { clearBookingErrors, getClassDataForBooking, reset, submitBooking, updateBookingDetails } from '../../services/booking/actions';

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
    constructor() {
        super();

        this.state = {
            submitted: false,
            scheduleOptions: null
        }
    }

    async componentDidMount() {
        this.props.reset();
        await this.props.getClassData(this.props.match.params.id);
        this.setState({
            scheduleOptions: datesTimesAsOption(this.props.classData.schedule)
        })
        this.props.updateBookingDetails({ classId: this.props.match.params.id });
    }

    componentWillUnmount() {
        this.props.clearBookingErrors();
    }

    handleSubmitCallback = (evt) => {
        evt.preventDefault();
        this.setState({ submitted: true }, () => this.props.submitBooking(this.state.scheduleOptions));
    }

    tryToRenderBooking() {
        const { errorLoadingClassData, classData } = this.props;
        const { scheduleOptions } = this.state;

        if (errorLoadingClassData)
            return <p className='text-danger text-center'>Error loading class</p>


        if (classData && scheduleOptions) {
            return (
                <>
                    <ClassSummary />
                    <Row className='justify-content-center' id='booking-container'>
                        <Col lg={5}>
                            <BookingDetails
                                handleSubmit={this.handleSubmitCallback}
                                submitted={this.state.submitted}
                                scheduleOptions={this.state.scheduleOptions}
                            />
                        </Col>
                        <Col lg={5}>
                            <BookingSummary submitted={this.state.submitted} handleSubmit={this.handleSubmitCallback} />
                        </Col>
                    </Row>
                </>
            )
        }

        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
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
        classData: state.booking.classData,
        errorLoadingClassData: state.booking.errorLoadingClassData,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        reset: () => dispatch(reset()),
        getClassData: (classId) => dispatch(getClassDataForBooking(classId)),
        clearBookingErrors: () => dispatch(clearBookingErrors()),
        updateBookingDetails: (bookingDetails) => dispatch(updateBookingDetails(bookingDetails)),
        submitBooking: (scheduleOptions) => dispatch(submitBooking(scheduleOptions)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookClass);