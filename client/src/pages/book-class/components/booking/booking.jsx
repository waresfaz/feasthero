import React from "react";
import { connect } from 'react-redux';
import { Spinner, Row, Col } from 'react-bootstrap';

import { loadClassDataForBooking } from '../../../../services/booking/actions';

import BookingDetails from '../booking-details/booking-details';
import BookingSummary from '../booking-summary/booking-summary';
import ClassSummary from '../class-summary/class-summary';

class Booking extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        await this.props.getClassData(this.props.classId);
        this.setState({ loading: false });
    }

    render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(Booking);