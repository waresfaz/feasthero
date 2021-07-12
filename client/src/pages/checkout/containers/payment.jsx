import React from 'react';

import { connect } from 'react-redux';


class Payment extends React.Component {

    async componentDidMount() {
        if (!this.props.bookingDetails) {
        }
    }

    render() {
        return (
            <>
                <p>{JSON.stringify(this.props.bookingDetails)}</p>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bookingDetails: state.booking,
    }
}

export default connect(mapStateToProps)(Payment);