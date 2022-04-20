import React from 'react';
import { Row, Col, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'
import { connect } from 'react-redux';
import { validBookingSizes, selectDropDownStyle } from '../../../../constants/app-constants';
import { submitBooking, updateBookingDetails } from '../../../../services/booking/actions';
import Button from '../../../../components/button/button';
import datesTimesAsOption from '../../../../helpers/dates-times-as-options';

import './booking-details.scss';


class BookingDetails extends React.Component {
    handleFormChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.props.updateBookingDetails({ [name]: value })
    }

    handleBookingSizeChange = (event) => {
        this.props.updateBookingDetails({ bookingSize: event.target.value });
    }

    handleDateTimeChange = (event) => {
        const { value, id } = event.target;
        this.props.updateBookingDetails({
            'selectedClassDateTime': value,
            'timeSlotId': id
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        this.props.submitBooking();
    }

    renderBookingSizeTooltip = (props) => (
        <Tooltip {...props}>
            <span id='booking-size-tooltip-content'>
                The number of screens that will be attending the class
            </span>
        </Tooltip>
    );

    render() {
        const { errors } = this.props;
        const scheduleOptions = datesTimesAsOption(this.props.classData.schedule);

        return (
            <div id='booking-details-container'>
                <h1>Booking Details</h1>
                <form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Row className='justify-content-around' id='number-of-devices-for-booking'>
                            <Col xs={1} className='text-center' id='info-icon-container'>
                                <OverlayTrigger
                                    placement='top'
                                    overlay={this.renderBookingSizeTooltip}
                                >
                                    <FontAwesomeIcon id='info-icon' icon={faInfoCircle} />
                                </OverlayTrigger>
                            </Col>

                            <Col xs={9} lg={7} className='text-right'>
                                <h5>Number of devices for booking</h5>
                            </Col>
                            <Col sm={12} lg={4}>
                                <Select
                                    styles={selectDropDownStyle}
                                    onChange={this.handleBookingSizeChange}
                                    value={validBookingSizes.filter((option) => option.target.value === this.props.bookingSize)}
                                    options={validBookingSizes}
                                />
                                <span className='text-danger'>{errors['bookingSize']}</span>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Select
                            required
                            styles={selectDropDownStyle}
                            onChange={this.handleDateTimeChange}
                            value={scheduleOptions.filter((option) => option.target.value === this.props.selectedClassDateTime)}
                            placeholder='Select Date & Time'
                            options={scheduleOptions}
                        />
                        <span className='text-danger'>{errors['classDateTime']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={this.props.customerFirstName} onChange={this.handleFormChange}
                            required type='text' placeholder='First Name'
                            name='customerFirstName'
                        />
                        <span className='text-danger'>{errors['customerFirstName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={this.props.customerLastName} onChange={this.handleFormChange}
                            required type='text' placeholder='Last Name'
                            name='customerLastName'
                        />
                        <span className='text-danger'>{errors['customerLastName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={this.props.companyName} onChange={this.handleFormChange}
                            required type='text' placeholder='Company Name'
                            name='companyName'
                        />
                        <span className='text-danger'>{errors['companyName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={this.props.customerEmail} onChange={this.handleFormChange}
                            required type='email' placeholder='Email Address'
                            name='customerEmail'
                        />
                        <span className='text-danger'>{errors['customerEmail']}</span>
                    </Form.Group>
                    <span className='text-danger'>{errors['error']}</span>
                    <Row>
                        <Col md={6}>
                            <Button primary={true} type='submit'
                                className='d-flex justify-content-center'
                                isButton={true}>
                                {this.props.loading ? <div className="loader"></div> : <span>Proceed to Payment</span>}
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bookingSize: state.booking.bookingSize,
        loading: state.booking.bookingSubmitIsLoading,
        errors: state.booking.bookingErrors,
        customerFirstName: state.booking.customerFirstName,
        customerLastName: state.booking.customerLastName,
        customerEmail: state.booking.customerEmail,
        selectedClassDateTime: state.booking.selectedClassDateTime,
        classData: state.booking.classData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBookingDetails: (bookingDetails) => dispatch(updateBookingDetails(bookingDetails)),
        submitBooking: () => dispatch(submitBooking()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);