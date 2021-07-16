import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CalculateTotals from '../../../../helpers/calculate-totals';
import { updateAllCosts } from '../../../../services/booking/actions';
import IncludeMealKits from './containers/include-meal-kits/include-meal-kits';

import './booking-summary.scss';

/**
 * the user's booking summary
 */
class BookingSummary extends React.Component {
    constructor(props) {
        super(props);
        props.updateAllCosts(this.calculateTotals())
    }

    static propTypes = {
        /**
         * update booking costs in the redux store such
         * as subtotal, tax, etc
         */
        updateAllCosts: PropTypes.func,

        /**
         * the user's booking details from redux store
         */
        bookingDetails: PropTypes.object,

        /**
         * the selected class's data
         */
        classData: PropTypes.object
    }

    getValuesForCostCalculation = () => {
        let { bookingSize, mealKitsBooked } = this.props.bookingDetails;
        let { mealKitPrice, costPerDevice } = this.props.classData;

        if (bookingSize === null || bookingSize === undefined)
            bookingSize = 0;

        return {
            bookingSize: bookingSize,
            costPerDevice: costPerDevice,
            mealKitPrice: mealKitPrice,
            bookingSizeWithMealKit: bookingSize,
            mealKitsBooked: mealKitsBooked,
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.bookingDetails.bookingSize !== this.props.bookingDetails.bookingSize
            || prevProps.bookingDetails.mealKitsBooked !== this.props.bookingDetails.mealKitsBooked
        ) {
            this.props.updateAllCosts(this.calculateTotals())
        }

    }

    calculateTotals = () => {
        // mealkits are ordered for every devices if meakit is selected
        return CalculateTotals.totals(...Object.values(this.getValuesForCostCalculation()))
    }

    render() {
        const { classData, bookingDetails } = this.props;
        return (
            <section id='booking-summary'>
                <h4>
                    ${classData.costPerDevice} per device
                </h4>
                <IncludeMealKits classData={classData} />
                <div className='summary-divider' />
                <Row>
                    <Col xs={6}>
                        <h5>Meal Kits</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${bookingDetails.mealKitsTotal}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <h5>Tax</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${bookingDetails.tax}</h5>
                    </Col>
                </Row>
                <div className='summary-divider' />
                <Row>
                    <Col xs={6}>
                        <h5>Grand Total</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${bookingDetails.grandTotal}</h5>
                    </Col>
                </Row>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAllCosts: (allCosts) => dispatch(updateAllCosts(allCosts)),
    }
}

const mapStateToProps = (state) => {
    return {
        bookingDetails: state.booking,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);