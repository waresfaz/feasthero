import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose } from 'redux';

const ShouldRedirectToAccount = WrappedComponent => {
    return class extends React.Component {
        accountDataIsNotPresent = () => {
            return !this.props.accountData;
        }

        render() {
            if (this.props.accountData)
                return <Redirect to='/account' />

            if (this.accountDataIsNotPresent())
                return <WrappedComponent {...this.props} />

            return <></>
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
    ShouldRedirectToAccount
);
