import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { compose } from 'redux';
import { CHEF } from '../constants/app-constants';

const MustBeChef = WrappedComponent => {
    return class extends React.Component {
        render() {
            if (!this.props.accountData)
                return <Redirect to='/auth/login' />

            if (this.props.accountData.type === CHEF)
                return <WrappedComponent {...this.props} />
            return <Redirect to='/auth/login' />
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
    MustBeChef
);
