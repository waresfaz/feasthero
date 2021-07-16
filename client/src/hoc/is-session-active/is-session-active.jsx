import React from 'react';
import checkSessionActive from '../../helpers/check-session-active';

const IntervalIsSessionActive = WrappedComponent => {
    return class extends React.Component {
        componentDidMount() {
            this.sessionCheck = setInterval(checkSessionActive, 10000);
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

export default IntervalIsSessionActive
