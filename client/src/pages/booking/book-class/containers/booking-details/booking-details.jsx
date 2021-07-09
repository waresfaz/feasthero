import React from 'react';
import { Row, Col, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'
import { connect } from 'react-redux';

import { validBookingSizes, bookingSizeDropdownStyle, dateTimeBookingDropdownStyle } from '../../../../../constants/app-constants';
import datesTimesAsOption from '../../../../../helpers/dates-times-as-options';
import { updateBookingDetails } from '../../../../../services/booking/actions';
import NumberDropdownValidator from '../../../../../validators/number-dropdown';
import DateTimeValidator from '../../../../../validators/datetime';

import Button from '../../../../../components/button/button';

import './booking-details.scss';

class BookingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.scheduleOptions = datesTimesAsOption(props.classData.schedule)
        this.state = {
            errors: {}
        }
    }

    updateImmutableState(name, value) {
        let newState = { [name]: value, }
        let mutableState = { ...this.props.bookingDetails, ...newState };
        return mutableState;
    }

    handleFormChange = (event) => {
        let value, name;
        if (event.name === 'bookingSize' || event.name === 'selectedClassDateTime') {
            value = event.value;
            name = event.name;
        } else {
            value = event.target.value;
            name = event.target.name;
        }

        this.props.updateBookingDetails(this.updateImmutableState(name, value))
    }

    validate = () => {
        let errors = {};

        errors['bookingSizeForBooking'] = this.validateBookingSize()
        errors['classDateTime'] = this.validateBookedDateTime();

        let valid = !Boolean(Object.keys(errors).length);
        if (!valid)
            this.setState({ errors });

        return valid;
    }

    validateBookingSize = () => {
        const bookingSizeUpperBounds = validBookingSizes[validBookingSizes.length - 1].value;
        const bookingSizeLowerBounds = validBookingSizes[0].value

        const numberDropDownErrorMessage =
            new NumberDropdownValidator(
                {
                    upperBounds: bookingSizeUpperBounds,
                    lowerBounds: bookingSizeLowerBounds,
                    mustBeInteger: true
                })
                .validate(this.props.bookingDetails.bookingSize);

        return numberDropDownErrorMessage;
    }

    validateBookedDateTime = () => {
        return DateTimeValidator.validate(this.props.bookingDetails.selectedClassDateTime, this.scheduleOptions);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.validate())
            return;
    }

    renderBookingSizeTooltip = (props) => (
        <Tooltip {...props}>
            <span id='booking-size-tooltip-content'>
                The number of screens that will be attending the class
            </span>
        </Tooltip>
    );

    render() {

        const { bookingDetails } = this.props;
        const { errors } = this.state;

        return (
            <div id='booking-details-container'>
                <h1 className='mb-5'>Booking Details</h1>
                <form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Row className='justify-content-around' id='number-of-devices-for-booking'>
                            <Col xs={1} className='text-center' id='info-icon-container'>
                                <OverlayTrigger
                                    placement='top'
                                    overlay={this.renderBookingSizeTooltip}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </OverlayTrigger>
                            </Col>

                            <Col xs={9} lg={7} className='text-right'>
                                <h5>Number of devices for booking</h5>
                            </Col>
                            <Col  sm={12} lg={4}>
                                <Select
                                    styles={bookingSizeDropdownStyle}
                                    onChange={this.handleFormChange}
                                    value={validBookingSizes.filter(({ value }) => value === bookingDetails.bookingSize)}
                                    options={validBookingSizes}
                                >
                                </Select>
                                <span className='text-danger'>{errors['bookingSizeForBooking']}</span>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Select
                            required
                            styles={dateTimeBookingDropdownStyle}
                            onChange={this.handleFormChange}
                            value={this.scheduleOptions.filter(({ value }) => value === bookingDetails.selectedClassDateTime)}
                            placeholder='Select Date & Time'
                            options={this.scheduleOptions}
                        />
                        <span className='text-danger'>{errors['classDateTime']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={bookingDetails.firstName} onChange={this.handleFormChange} required type='text' placeholder='First Name' name='firstName' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={bookingDetails.lastName} onChange={this.handleFormChange} required type='text' placeholder='Last Name' name='lastName' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={bookingDetails.companyName} onChange={this.handleFormChange} required type='text' placeholder='Company Name' name='companyName' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={bookingDetails.emailAddress} onChange={this.handleFormChange} required type='email' placeholder='Email Address' name='emailAddress' />
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Button type='submit' isButton='true'>Proceed to Payment</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bookingDetails: state.booking.bookingDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBookingDetails: (bookingDetails) => dispatch(updateBookingDetails(bookingDetails)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);