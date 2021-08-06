import React from 'react';

import './chef-account.scss';

class ChefAccount extends React.Component {
    render() {
        return (
            <>
                <p>{JSON.stringify(this.props.account.accountData)}</p>
            </>
        )
    }
}

export default ChefAccount;