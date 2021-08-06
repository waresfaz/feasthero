import React from 'react';
import { connect } from 'react-redux';

import Logout from './components/logout/logout';
import WithAuth from '../../hoc/with-auth/with-auth';

import './account.scss';

class Account extends React.Component {
    render() {
        return (
            <>
                <p>You are a  {this.props.account.accountData.type.toLowerCase()}</p>
                <p>{JSON.stringify(this.props.account.accountData)}</p>
                <Logout />
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