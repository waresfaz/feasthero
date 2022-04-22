import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { loadAccount } from '../services/auth/actions';

const LoadAccount = WrappedComponent => {
    return class extends React.Component {

        async componentDidMount() {
            await this.props.loadAccount();
        }

        render() {
            return (
                <>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAccount: () => dispatch(loadAccount()),
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    LoadAccount
);