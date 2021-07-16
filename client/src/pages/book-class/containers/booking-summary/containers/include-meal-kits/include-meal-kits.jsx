import React from 'react'
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updatemealKitsBooked } from '../../../../../../services/booking/actions';

/**
 * container for selecting if meal kits should be booked
 * @since 2.0.0
 */
class IncludeMealKits extends React.Component {
    static propTypes = {
        /**
         * the selected class's data
         */
        classData: PropTypes.object
    }

    toggleIncludeMealKits = () => {
        this.props.updatemealKitsBooked(!this.props.bookingDetails.mealKitsBooked);
    }

    render() {
        const { classData, bookingDetails } = this.props;

        return (
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
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatemealKitsBooked: (mealKitsBooked) => dispatch(updatemealKitsBooked(mealKitsBooked)),
    }
}

const mapStateToProps = (state) => {
    return {
        bookingDetails: state.booking,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncludeMealKits);