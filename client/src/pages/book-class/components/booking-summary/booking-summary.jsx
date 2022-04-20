import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';


import CalculateTotals from '../../../../helpers/calculate-totals';
import { updateBookingDetails } from '../../../../services/booking/actions';
import IncludeMealKits from './components/include-meal-kits/include-meal-kits';

import './booking-summary.scss';


class BookingSummary extends React.Component {
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
            this.props.updateBookingDetails({...this.calculateTotals()});
    }

    costFactorsDidChange(prevProps) {
        return prevProps.bookingSize !== this.props.bookingSize || prevProps.mealKitsBooked !== this.props.mealKitsBooked;
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
                        <h5 className='dollar-amount'>${this.props.mealKitsTotal}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <h5>Tax</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${this.props.tax}</h5>
                    </Col>
                </Row>
                <div className='summary-divider' />
                <Row>
                    <Col xs={6}>
                        <h5>Grand Total</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${this.props.grandTotal}</h5>
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
        mealKitsBooked: state.booking.mealKitsBooked,
        grandTotal: state.booking.grandTotal,
        tax: state.booking.tax,
        mealKitsTotal: state.booking.mealKitsTotal
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);