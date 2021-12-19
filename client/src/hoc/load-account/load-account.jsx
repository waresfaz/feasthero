import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ls from 'local-storage'

import { setAccount } from '../../services/accounts/actions';

const LoadAccount = WrappedComponent => {
    return class extends React.Component {

        async componentDidMount() {
            if (!ls.get('account') || ls.get('account') === 'undefined')
                return;
            this.props.setAccount(JSON.parse(ls.get('account')));
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
        setAccount: (account) => dispatch(setAccount(account)),
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    LoadAccount
);