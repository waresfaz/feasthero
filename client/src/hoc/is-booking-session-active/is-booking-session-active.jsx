import React from 'react';
import checkBookingSessionActive from '../../helpers/check-booking-session-active';

const IntervalIsBookingSessionActive = WrappedComponent => {
    return class extends React.Component {
        componentDidMount() {
            this.sessionCheck = setInterval(checkBookingSessionActive, 120000);
        }

        componentWillUnmount() {
            clearInterval(this.sessionCheck);
        }

        render() {
            return (
                <WrappedComponent />
            )
        }
    }
}

export default IntervalIsBookingSessionActive
