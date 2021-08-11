import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { getAllClasses } from '../../services/classes/actions';
import { reset, updateClassId } from '../../services/booking/actions';

import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import BookClassDetails from './components/book-class-details/book-class-details';

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
        this.state = {
            classData: null,
        }
    }

    componentDidMount() {
        if (!this.props.allClasses) {
            this.props.getAllClasses();
        } else {
            this.initClassData(this.props);
        }
    }

    componentDidUpdate(prevProps) {
        const hasChanged = this.props.allClasses !== prevProps.allClasses;
        if (hasChanged) {
            this.initClassData(this.props);
        }
    }

    initClassData = (props) => {
        const classData = props.allClasses.find(class_ => class_._id === props.match.params.id)
        props.updateClassId(classData._id);
        this.setState({ classData: classData });
    }

    tryToRenderBooking() {
        let { classData } = this.state;

        if (classData !== null) {
            if (classData === false)
                return <p className='error'>Error loading class</p>
            else
                return (
                    <>
                        <BookClassDetails {...this.props} classData={classData} />
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
        allClasses: state.classes.allClasses,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => dispatch(getAllClasses()),
        reset: () => dispatch(reset()),
        updateClassId: (classId) => dispatch(updateClassId(classId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookClass);