import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';

import CalculateTotals from '../../../../../helpers/calculate-totals';

import './booking-summary.scss';

class BookingSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMealKits: false,
        }

        const { bookingSize, costPerDevice, hasMealKits, mealKitCost } = this.getValuesForCostCalculation();
        this.state = {
            ...this.state,
            total: CalculateTotals.totals(bookingSize, costPerDevice, mealKitCost, bookingSize, hasMealKits)
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bookingDetails.bookingSize !== this.props.bookingDetails.bookingSize || prevState.hasMealKits !== this.state.hasMealKits)
            this.calculateTotals();
    }

    getValuesForCostCalculation = () => {
        const bookingSize = this.props.bookingDetails.bookingSize;
        const costPerDevice = this.props.classData.cost;
        const { hasMealKits } = this.state;
        const mealKitCost = this.props.classData.mealKitPrice;

        return {
            bookingSize: bookingSize,
            costPerDevice: costPerDevice,
            hasMealKits: hasMealKits,
            mealKitCost: mealKitCost,
            bookingSizeWithMealKit: bookingSize
        }
    }

    toggleIncludeMealKits = () => {
        this.setState(prevState => ({
            hasMealKits: !prevState.hasMealKits,
        }))
    }

    calculateTotals = () => {
        const { bookingSize, costPerDevice, hasMealKits, mealKitCost, bookingSizeWithMealKit } = this.getValuesForCostCalculation();

        // mealkits are ordered for every devices if meakit is selected
        this.setState({
            total: CalculateTotals.totals(bookingSize, costPerDevice, mealKitCost, bookingSizeWithMealKit, hasMealKits)
        })
    }

    render() {
        const { classData } = this.props;

        return (
            <section id='booking-summary'>
                <h4>
                    ${classData.cost} per device
                </h4>
                <form>
                    <Form.Group>
                        <Form.Check
                            onChange={this.toggleIncludeMealKits} type='checkbox'
                            label={<p>Include pre-portioned ingredient kit for class. (4 servings per kit) <span>Additional ${classData.mealKitPrice}/device.</span></p>}
                        />
                    </Form.Group>
                </form>
                <div className='summary-divider' />
                <Row>
                    <Col xs={6}>
                        <h5>Meal Kit</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${this.state.total.mealKitTotal}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <h5>Tax</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${this.state.total.tax}</h5>
                    </Col>
                </Row>
                <div className='summary-divider' />
                <Row>
                    <Col xs={6}>
                        <h5>Grand Total</h5>
                    </Col>
                    <Col xs={6}>
                        <h5 className='dollar-amount'>${this.state.total.grandTotal}</h5>
                    </Col>
                </Row>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bookingDetails: state.booking.bookingDetails,
    }
}

export default connect(mapStateToProps)(BookingSummary);