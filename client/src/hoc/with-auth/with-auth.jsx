import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose } from 'redux';

const WithAuth = WrappedComponent => {
    return class extends React.Component {
        render() {
            if (this.props.accountData === null)
                return <Redirect to='/auth/login' />

            if (this.props.accountData)
                return <WrappedComponent {...this.props} />

            return <></>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        accountData: state.account.accountData,
    }
}

export default compose(
    connect(mapStateToProps),
    WithAuth
);
