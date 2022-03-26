import React from 'react'
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { updateBookingDetails } from '../../../../../../services/booking/actions';

class IncludeMealKits extends React.Component {
    toggleIncludeMealKits = () => {
        this.props.updateBookingDetails({
            ...this.props.bookingDetails,
            mealKitsBooked: !this.props.bookingDetails.mealKitsBooked
        });
    }

    render() {
        const { classData, bookingDetails, errors } = this.props;

        return (
            <form>
                <Form.Group>
                    <Form.Check
                        onChange={this.toggleIncludeMealKits} type='checkbox'
                        defaultChecked={bookingDetails.mealKitsBooked}
                        value={bookingDetails.mealKitsBooked}
                        label={<p>Include pre-portioned ingredient kit for class. (4 servings per kit) <span>Additional ${classData.mealKitCost}/device.</span></p>}
                    />
                    <span className='text-danger error'>{errors['mealKitsBooked']}</span>
                </Form.Group>
            </form>
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
        bookingDetails: state.booking.bookingDetails,
        errors: state.booking.bookingErrors
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncludeMealKits);