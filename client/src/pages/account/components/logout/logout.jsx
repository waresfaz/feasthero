import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../../../services/auth/actions.js';
import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';

class Logout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    logout = () => {
        this.setState({ loading: true })
        this.props.logout();
        this.setState({ loading: false })
    }

    render() {
        return (
            <>
                <Loader show={this.state.loading} />
                <Button secondary className='w-100 py-3 d-block mt-5' isButton={true} onClick={this.logout}>Logout</Button>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);