import React from 'react';

import './customer-account.scss';

class CustomerAccount extends React.Component {
    render() {
        return (
            <>
                <p>{JSON.stringify(this.props.account.accountData)}</p>
            </>
        );
    }
}

export default CustomerAccount;