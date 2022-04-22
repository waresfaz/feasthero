import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose } from 'redux';

const WithAuth = WrappedComponent => {
    return class extends React.Component {
        render() {
            console.log(this.props.accountData);
            if (!this.props.accountData)
                return <Redirect to='/auth/login' />

            return <WrappedComponent {...this.props} />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        accountData: state.auth.account,
    }
}

export default compose(
    connect(mapStateToProps),
    WithAuth
);
