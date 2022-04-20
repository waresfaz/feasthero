import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';


import CalculateTotals from '../../../../helpers/calculate-totals';
import { updateBookingDetails } from '../../../../services/booking/actions';
import IncludeMealKits from './components/include-meal-kits/include-meal-kits';

import './booking-summary.scss';


class BookingSummary extends React.Component {
    constructor() {
        super();

        this.state = {
            tax: 0.00,
            mealKitsTotal: 0.00,
            grandTotal: 0.00
        }
    }

    getValuesForCostCalculation = () => {
        let { bookingSize, mealKitsBooked } = this.props;
        let { mealKitCost, costPerDevice } = this.props.classData;

        if (this.bookingSizeDoesNotExist())
            bookingSize = 0;

        return {
            bookingSize: bookingSize,
            costPerDevice: costPerDevice,
            mealKitCost: mealKitCost,
            bookingSizeWithMealKit: bookingSize,
            mealKitsBooked: mealKitsBooked,
        }
    }

    bookingSizeDoesNotExist = () => {
        let { bookingSize } = this.props;
        return bookingSize === null || bookingSize === undefined;
    }

    componentDidUpdate(prevProps) {
        if (this.costFactorsDidChange(prevProps))
            this.setState(this.calculateTotals());

        if (this.props.submitted)
            this.handleSubmit();
    }

    costFactorsDidChange(prevProps) {
        return prevProps.bookingSize !== this.props.bookingSize || prevProps.mealKitsBooked !== this.props.mealKitsBooked;
    } 

    handleSubmit = () => {
        this.props.updateBookingDetails({ ...this.state });
    }

    calculateTotals = () => {
        return CalculateTotals.totals(...Object.values(this.getValuesForCostCalculation()))
    }

    render() {
        const { classData } = this.props;

        return (
            <section id='booking-summary'>
                <h4>
                    ${classData.costPerDevice} per device
                </h4>
                {
                    classData.hasMealKit
                        ?
                        <IncludeMealKits classData={classData} />
                        :
                        <></>
                }
                <div className='summary-divider' />
                <Row>
                    <Col xs={6}>
                        <h5>Meal Kits</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${this.state.mealKitsTotal}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <h5>Tax</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${this.state.tax}</h5>
                    </Col>
                </Row>
                <div className='summary-divider' />
                <Row>
                    <Col xs={6}>
                        <h5>Grand Total</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${this.state.grandTotal}</h5>
                    </Col>
                </Row>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBookingDetails: (bookingDetails) => dispatch(updateBookingDetails(bookingDetails)),
    }
}

const mapStateToProps = (state) => {
    return {
        bookingSize: state.booking.bookingSize,
        classData: state.booking.classData,
        mealKitsBooked: state.booking.mealKitsBooked
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);