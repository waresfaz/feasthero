import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../../../services/auth/actions.js';
import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';

class Logout extends React.Component {
    logout = () => {
        this.props.logout();
    }

    render() {
        return (
            <>
                <Loader show={this.props.loading} />
                <Button secondary className='w-100 py-3 d-block mt-5' isButton={true} onClick={this.logout}>Logout</Button>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);