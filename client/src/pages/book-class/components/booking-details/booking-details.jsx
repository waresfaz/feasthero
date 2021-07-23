import React from 'react';
import { Row, Col, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'
import { connect } from 'react-redux';


import { validBookingSizes, bookingSizeDropdownStyle, dateTimeBookingDropdownStyle } from '../../../../constants/app-constants';
import datesTimesAsOption from '../../../../helpers/dates-times-as-options';
import NumberDropdownValidator from '../../../../validators/number-dropdown';
import EmailValidator from '../../../../validators/email';
import DateTimeValidator from '../../../../validators/datetime';
import history from '../../../../history';
import { initBookingDetailsSession } from '../../../../services/booking/api';

import Button from '../../../../components/button/button';

import { updateGeneralBookerAndBookingDetails } from '../../../../services/booking/actions';
import NameValidator from '../../../../validators/name';
import NotEmptyValidator from '../../../../validators/not-empty';

import './booking-details.scss';

class BookingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.scheduleOptions = datesTimesAsOption(props.classData.schedule)
        this.state = {
            loading: false,
            errors: [],
            formErrors: {}
        }
    }

    getGeneralBookerAndBookingDetails = () => {
        const { bookingDetails } = this.props;
        return {
            customerFirstName: bookingDetails.customerFirstName,
            customerLastName: bookingDetails.customerLastName,
            selectedClassDateTime: bookingDetails.selectedClassDateTime,
            companyName: bookingDetails.companyName,
            customerEmail: bookingDetails.customerEmail,
            bookingSize: bookingDetails.bookingSize,
        }
    }

    handleFormChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.props.updateGeneralBookerAndBookingDetails({
            ...this.getGeneralBookerAndBookingDetails(), [name]: value
        })
    }

    validate = () => {
        let formErrors = {};
        const { customerFirstName, customerLastName, companyName, customerEmail, selectedClassDateTime } = this.props.bookingDetails;

        formErrors['bookingSizeForBooking'] = this.validateBookingSize()
        formErrors['classDateTime'] = DateTimeValidator.validate(selectedClassDateTime, this.scheduleOptions);
        formErrors['customerEmail'] = EmailValidator.validate(customerEmail);
        formErrors['customerFirstName'] = NameValidator.validate(customerFirstName);
        formErrors['customerLastName'] = NameValidator.validate(customerLastName);
        formErrors['comanyName'] = NotEmptyValidator.validate(companyName);

        let valid = Object.values(formErrors).every(error => error === null);
        if (!valid)
            this.setState({ formErrors });

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

    handleSubmit = async (event) => {
        event.preventDefault();

        if (!this.validate())
            return;

        this.setState({
            loading: true,
        })
        if (!await initBookingDetailsSession(this.props.bookingDetails)) {
            const error = 'Error creating checkout session, please try again later';
            this.setState(prevState => ({
                errors: [...prevState.errors, error],
            }));
        }
        this.setState({
            loading: false,
        })

        if (this.state.errors.length > 0)
            return;

        history.push('/checkout')
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
        const { formErrors } = this.state;

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
                                    styles={bookingSizeDropdownStyle}
                                    onChange={this.handleFormChange}
                                    value={validBookingSizes.filter((option) => option.target.value === bookingDetails.bookingSize)}
                                    options={validBookingSizes}
                                >
                                </Select>
                                <span className='text-danger'>{formErrors['bookingSizeForBooking']}</span>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Select
                            required
                            styles={dateTimeBookingDropdownStyle}
                            onChange={this.handleFormChange}
                            value={this.scheduleOptions.filter((option) => option.target.value === bookingDetails.selectedClassDateTime)}
                            placeholder='Select Date & Time'
                            options={this.scheduleOptions}
                        />
                        <span className='text-danger'>{formErrors['classDateTime']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={bookingDetails.customerFirstName} onChange={this.handleFormChange}
                            required type='text' placeholder='First Name'
                            name='customerFirstName'
                        />
                        <span className='text-danger'>{formErrors['customerFirstName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={bookingDetails.customerLastName} onChange={this.handleFormChange}
                            required type='text' placeholder='Last Name'
                            name='customerLastName'
                        />
                        <span className='text-danger'>{formErrors['customerLastName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={bookingDetails.companyName} onChange={this.handleFormChange}
                            required type='text' placeholder='Company Name'
                            name='companyName'
                        />
                        <span className='text-danger'>{formErrors['companyName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={bookingDetails.customerEmail} onChange={this.handleFormChange}
                            required type='email' placeholder='Email Address'
                            name='customerEmail'
                        />
                        <span className='text-danger error'>{formErrors['customerEmail']}</span>
                    </Form.Group>
                    <p className='text-danger error'>{this.state.errors.map(error => <span>{error}<br /></span>)}</p>
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
        bookingDetails: state.booking,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateGeneralBookerAndBookingDetails:
            (generalBookerAndBookingDetails) => dispatch(
                updateGeneralBookerAndBookingDetails(
                    generalBookerAndBookingDetails
                )
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);