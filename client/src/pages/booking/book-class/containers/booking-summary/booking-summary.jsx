import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';

import CalculateTotals from '../../../../../helpers/calculate-totals';
import { updateAllCosts, updatemealKitsBooked } from '../../../../../services/booking/actions';

import './booking-summary.scss';

class BookingSummary extends React.Component {
    constructor(props) {
        super(props);
        props.updateAllCosts(this.calculateTotals())
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

    toggleIncludeMealKits = () => {
        this.props.updatemealKitsBooked(!this.props.bookingDetails.mealKitsBooked);
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
                <form>
                    <Form.Group>
                        <Form.Check
                            onChange={this.toggleIncludeMealKits} type='checkbox'
                            defaultChecked={bookingDetails.mealKitsBooked}
                            value={bookingDetails.mealKitsBooked}
                            label={<p>Include pre-portioned ingredient kit for class. (4 servings per kit) <span>Additional ${classData.mealKitPrice}/device.</span></p>}
                        />
                    </Form.Group>
                </form>
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
        updatemealKitsBooked: (mealKitsBooked) => dispatch(updatemealKitsBooked(mealKitsBooked)),
        updateAllCosts: (allCosts) => dispatch(updateAllCosts(allCosts)),
    }
}

const mapStateToProps = (state) => {
    return {
        bookingDetails: state.booking,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);