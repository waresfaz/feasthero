import React from 'react';
import checkBookingSessionActive from '../../helpers/check-booking-session-active';

/**
 * check if booking details session has expired every 2 minutes.
 * 
 * @since 2.0.0
 * 
 * @param {React.Component} WrappedComponent - component to render
 * @returns {React.Component} - component that renders the wrapped component
 */
const IntervalIsBookingSessionActive = WrappedComponent => {
    return class extends React.Component {

        /**
         * initialize the interval
         */
        componentDidMount() {
            this.sessionCheck = setInterval(checkBookingSessionActive, 120000);
        }

        /**
         * clear the interval just before component is unmounted
        */
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
