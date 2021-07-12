import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Loader from '../../components/loader/loader';

import { updateAllBookingDetails } from '../../services/booking/actions';
import { getBookingDetailsFromSession } from '../../services/booking/api';
import history from '../../history';

/**
 * @description hoc that will pass bookingDetails as props
 */

const EnsureBookingDetailsHOC = WrappedComponent => {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                loading: true,
            }
        }

        isBookingDetailsEmpty(bookingDetails) {
            return Object.keys(bookingDetails).every((k) => !bookingDetails[k])
        }

        async componentDidMount() {
            if (this.isBookingDetailsEmpty(this.props.bookingDetails))
                this.props.fetchBookingDetails(await getBookingDetailsFromSession())

            this.setState({
                loading: false,
            })

            if (this.isBookingDetailsEmpty(this.props.bookingDetails))
                history.push('/')
        }

        render() {
            return (
                this.state.loading
                    ?
                    <Loader show={this.state.loading} />
                    :
                    this.props.bookingDetails === false
                        ?
                        <h4 className='text-danger'>Error loading booking details, please try again</h4>
                        :
                        <WrappedComponent bookingDetails={this.props.bookingDetails} />
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        bookingDetails: state.booking,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBookingDetails: (bookingDetails) => dispatch(updateAllBookingDetails(bookingDetails))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    EnsureBookingDetailsHOC
)