import React from 'react';
import { connect } from 'react-redux';
import { Spinner, Row, Col } from 'react-bootstrap';

import { reset, updateClassId } from '../../services/booking/actions';
import { getClass } from '../../services/classes/actions';

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
    constructor(props) {
        super(props);
        props.reset();
    }

    componentDidMount() {
        if (!this.props.selectedClass)
            this.props.getClass(this.props.match.params.id);
        else
            this.props.updateClassId(this.props.selectedClass._id);
    }

    componentDidUpdate(prevProps) {
        const hasChanged = this.props.selectedClass !== prevProps.selectedClass;
        if (hasChanged)
            this.props.updateClassId(this.props.selectedClass._id);
    }

    classDataRequestHasCompleted = () => {
        return this.props.selectedClass !== null && this.props.selectedClass !== undefined;
    }

    errorLoadingClassData = () => {
        return this.props.selectedClass === false;
    }

    tryToRenderBooking() {
        const classData = this.props.selectedClass;

        if (this.classDataRequestHasCompleted()) {
            if (this.errorLoadingClassData())
                return <p className='text-danger text-center'>Error loading class</p>
            else
                return (
                    <>
                        <ClassSummary classData={classData} chef={classData.chefs[0]} />
                        <Row className='justify-content-center' id='booking-container'>
                            <Col lg={5}>
                                <BookingDetails classData={classData} />
                            </Col>
                            <Col lg={5}>
                                <BookingSummary classData={classData} />
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

    classDataHasNotLoaded = () => {
        return this.state.classData === null;
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
        selectedClass: state.classes.selectedClass,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reset: () => dispatch(reset()),
        updateClassId: (classId) => dispatch(updateClassId(classId)),
        getClass: (classId) => dispatch(getClass(classId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookClass);