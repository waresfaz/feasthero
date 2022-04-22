import React from 'react';
import { connect } from 'react-redux';

import Logout from './components/logout/logout';
import WithAuth from '../../hoc/with-auth';
import { CHEF, CUSTOMER } from '../../constants/app-constants';

import ChefAccount from './components/chef/chef-account';
import CustomerAccount from './components/customer/customer-account';

import './account.scss';

class Account extends React.Component {
    chooseWhichAccountComponentToRender() {
        console.log(this.props.account)
        const accountType = this.props.account.type;
        if (accountType === CHEF)
            return <ChefAccount account={this.props.account} />
        if (accountType === CUSTOMER)
            return <CustomerAccount account={this.props.account} />
        return <></>
    }

    render() {
        return (
            <>
                {this.chooseWhichAccountComponentToRender()}
                <Logout />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.auth.account,
    }
}


export default connect(mapStateToProps)(WithAuth(Account));