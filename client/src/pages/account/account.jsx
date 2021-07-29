import React from 'react';
import WithAuth from '../../hoc/with-auth/with-auth';
import { connect } from 'react-redux';

import './account.scss';

class Account extends React.Component {
    render() {
        return (
            <>
                <p>{JSON.stringify(this.props.account.accountData)}</p>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
    }
}


export default connect(mapStateToProps)(WithAuth(Account));