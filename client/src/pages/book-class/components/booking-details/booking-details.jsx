import React from 'react';
import { Row, Col, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'
import { connect } from 'react-redux';
import { validBookingSizes, selectDropDownStyle } from '../../../../constants/app-constants';
import { updateBookingDetails } from '../../../../services/booking/actions';
import Button from '../../../../components/button/button';

import './booking-details.scss';

class BookingDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            customerFirstName: '',
            customerLastName: '',
            companyName: '',
            customerEmail: '',
            selectedClassDateTime: '',
            timeSlotId: '',
        }
    }

    componentDidUpdate() {
        if (this.props.submitted)
            this.handleSubmit();
    }

    handleFormChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
        });
    }

    handleBookingSizeChange = (event) => {
        this.props.updateBookingDetails({ bookingSize: event.target.value });
    }

    handleDateTimeChange = (event) => {
        const { value, id } = event.target;
        this.setState({
            'selectedClassDateTime': value,
            'timeSlotId': id
        })
    }

    handleSubmit = () => {
        this.props.updateBookingDetails({ ...this.state });
    }

    renderBookingSizeTooltip = (props) => (
        <Tooltip {...props}>
            <span id='booking-size-tooltip-content'>
                The number of screens that will be attending the class
            </span>
        </Tooltip>
    );

    render() {
        const { errors, loading, bookingSize } = this.props;

        return (
            <div id='booking-details-container'>
                <h1>Booking Details</h1>
                <form onSubmit={this.props.handleSubmit}>
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
                                    value={validBookingSizes.filter((option) => option.target.value === bookingSize)}
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
                            value={this.props.scheduleOptions.filter((option) => option.target.value === this.state.selectedClassDateTime)}
                            placeholder='Select Date & Time'
                            options={this.props.scheduleOptions}
                        />
                        <span className='text-danger'>{errors['classDateTime']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={this.state.customerFirstName} onChange={this.handleFormChange}
                            required type='text' placeholder='First Name'
                            name='customerFirstName'
                        />
                        <span className='text-danger'>{errors['customerFirstName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={this.state.customerLastName} onChange={this.handleFormChange}
                            required type='text' placeholder='Last Name'
                            name='customerLastName'
                        />
                        <span className='text-danger'>{errors['customerLastName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={this.state.companyName} onChange={this.handleFormChange}
                            required type='text' placeholder='Company Name'
                            name='companyName'
                        />
                        <span className='text-danger'>{errors['companyName']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            value={this.state.customerEmail} onChange={this.handleFormChange}
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
                                {loading ? <div className="loader"></div> : <span>Proceed to Payment</span>}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBookingDetails: (bookingDetails) => dispatch(updateBookingDetails(bookingDetails)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);