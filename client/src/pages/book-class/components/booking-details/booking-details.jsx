import React from 'react';
import { Row, Col, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'
import { connect } from 'react-redux';


import { validBookingSizes, selectDropDownStyle } from '../../../../constants/app-constants';

import datesTimesAsOption from '../../../../helpers/dates-times-as-options';
import BookingSizeValidator from '../../../../validators/booking-size';
import EmailValidator from '../../../../validators/email';
import NotEmptyValidator from '../../../../validators/not-empty';
import BooleanValidator from '../../../../validators/boolean';
import DateTimeValidator from '../../../../validators/datetime';
import NameValidator from '../../../../validators/name';

import history from '../../../../history';
import { initBookingDetailsSession } from '../../../../services/booking/api';
import { setMealKitsBookedError, updateGeneralBookerAndBookingDetails } from '../../../../services/booking/actions';

import Button from '../../../../components/button/button';

import './booking-details.scss';

class BookingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.scheduleOptions = datesTimesAsOption(props.classData.schedule)
        this.state = {
            loading: false,
            errors: {}
        }
    }

    handleFormChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.props.updateGeneralBookerAndBookingDetails({
            ...this.props.bookingDetails, [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.clearErrors();

        if (!this.validate())
            return;

        this.setState({
            loading: true,
        })

        if (!(await this.initBookingSession()))
            return;

        history.push('/checkout')
    }

    clearErrors = () => {
        this.setState({
            errors: {}
        })
    }

    validate = () => {
        let errors = {};
        const { customerFirstName, customerLastName, companyName, customerEmail, selectedClassDateTime } = this.props.bookingDetails;

        errors['bookingSize'] = BookingSizeValidator.validate(this.props.bookingDetails.bookingSize)
        errors['classDateTime'] = DateTimeValidator.validate(selectedClassDateTime, this.scheduleOptions);
        errors['customerEmail'] = EmailValidator.validate(customerEmail);
        errors['customerFirstName'] = NameValidator.validate(customerFirstName);
        errors['customerLastName'] = NameValidator.validate(customerLastName);
        errors['comanyName'] = NotEmptyValidator.validate(companyName);

        let valid = Object.values(errors).every(error => error === null);
        if (this.doesMealKitCheckHaveError())
            valid = false;

        if (!valid)
            this.setState({ errors });

        return true;
    }

    doesMealKitCheckHaveError = () => {
        let mealKitsBookedValidatedError = BooleanValidator.validate(this.props.bookingDetails.mealKitsBooked);
        if (mealKitsBookedValidatedError) {
            mealKitsBookedValidatedError = 'meal kit value ' + mealKitsBookedValidatedError;
            this.props.setMealKitsBookedError(mealKitsBookedValidatedError)
        }
        return mealKitsBookedValidatedError;
    }

    initBookingSession = async () => {
        const initBookingSessionResult = await initBookingDetailsSession(this.props.bookingDetails);
        if (initBookingSessionResult.error) {
            this.handleInitBookingSessionError(initBookingSessionResult.error);
            return false;
        }
        return true;
    }

    handleInitBookingSessionError = (errorResponse) => {
        if (this.requestErrorHasAdditionalInfo(errorResponse)) {
            this.setState({
                errors: errorResponse.data['errors'],
                loading: false,
            });
        } else {
            this.setState({
                errors: { error: 'Error creating checkout session, please try again later' },
                loading: false,
            });
        }
    }

    requestErrorHasAdditionalInfo = (errorResponse) => {
        return errorResponse.status === 400 && errorResponse.data['errors']
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
                                    onChange={this.handleFormChange}
                                    value={validBookingSizes.filter((option) => option.target.value === bookingDetails.bookingSize)}
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
                            onChange={this.handleFormChange}
                            value={this.scheduleOptions.filter((option) => option.target.value === bookingDetails.selectedClassDateTime)}
                            placeholder='Select Date & Time'
                            options={this.scheduleOptions}
                        />
                        <span className='text-danger'>{errors['classDateTime']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={bookingDetails.customerFirstName} onChange={this.handleFormChange}
                            required type='text' placeholder='First Name'
                            name='customerFirstName'
                        />
                        <span className='text-danger'>{errors['customerFirstName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={bookingDetails.customerLastName} onChange={this.handleFormChange}
                            required type='text' placeholder='Last Name'
                            name='customerLastName'
                        />
                        <span className='text-danger'>{errors['customerLastName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={bookingDetails.companyName} onChange={this.handleFormChange}
                            required type='text' placeholder='Company Name'
                            name='companyName'
                        />
                        <span className='text-danger'>{errors['companyName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={bookingDetails.customerEmail} onChange={this.handleFormChange}
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
                                {this.state.loading ? <div className="loader"></div> : <span>Proceed to Payment</span>}
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
        bookingDetails: state.booking.bookingDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateGeneralBookerAndBookingDetails:
            (generalBookerAndBookingDetails) => dispatch(
                updateGeneralBookerAndBookingDetails(
                    generalBookerAndBookingDetails
                )
            ),
        setMealKitsBookedError: (error) => dispatch(setMealKitsBookedError(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);