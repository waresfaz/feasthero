import React from 'react'
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { updateBookerAndBookingDetails } from '../../../../../../services/booking/actions';

class IncludeMealKits extends React.Component {
    toggleIncludeMealKits = () => {
        this.props.updateBookerAndBookingDetails({
            ...this.props.bookingDetails,
            mealKitsBooked: !this.props.bookingDetails.mealKitsBooked
        });
    }

    render() {
        const { classData, bookingDetails, mealKitsBookedError } = this.props;

        return (
            <form>
                <Form.Group>
                    <Form.Check
                        onChange={this.toggleIncludeMealKits} type='checkbox'
                        defaultChecked={bookingDetails.mealKitsBooked}
                        value={bookingDetails.mealKitsBooked}
                        label={<p>Include pre-portioned ingredient kit for class. (4 servings per kit) <span>Additional ${classData.mealKitCost}/device.</span></p>}
                    />
                    <span className='text-danger error'>{mealKitsBookedError}</span>
                </Form.Group>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBookerAndBookingDetails: (bookingDetails) => dispatch(updateBookerAndBookingDetails(bookingDetails)),
    }
}

const mapStateToProps = (state) => {
    return {
        bookingDetails: state.booking.bookingDetails,
        mealKitsBookedError: state.booking.mealKitsBookedError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncludeMealKits);