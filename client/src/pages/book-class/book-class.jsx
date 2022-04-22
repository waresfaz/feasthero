import React from 'react';
import { connect } from 'react-redux';
import { Spinner, Row, Col } from 'react-bootstrap';
import { loadClassDataForBooking } from '../../services/booking/actions';

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
            loading: false,
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        await this.props.getClassData(this.props.match.params.id);
        this.setState({ loading: false });
    }

    tryToRenderBooking() {
        const { getClassDataError, classData } = this.props;

        if (this.state.loading) {
            return (
                <div className='d-flex justify-content-center'>
                    <Spinner animation='border' />
                </div>
            )
        }

        if (getClassDataError)
            return <p className='text-danger text-center'>Error loading class</p>

        if (classData) {
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

        return <></>
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
        getClassDataError: state.booking.getClassDataError,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getClassData: (classId) => dispatch(loadClassDataForBooking(classId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookClass);