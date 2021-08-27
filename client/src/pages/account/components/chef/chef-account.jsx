import React from 'react';

import AddClass from './components/add-class/add-class';
import Classes from './components/classes/classes';

import './chef-account.scss';

class ChefAccount extends React.Component {
    render() {
        return (
            <>
                <Classes />
                <AddClass />
            </>
        )
    }
}

export default ChefAccount;