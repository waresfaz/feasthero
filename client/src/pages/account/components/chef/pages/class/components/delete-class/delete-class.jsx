import React from 'react'
import { connect } from 'react-redux';

import Button from '../../../../../../../../components/button/button'
import Loader from '../../../../../../../../components/loader/loader';

import history from '../../../../../../../../history'
import { deleteClass } from '../../../../../../../../services/classes/api'

// TODO

class DeleteClass extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            errors: {}
        }
    }

    deleteClass = async () => {
        this.setState({ loading: true })

        const response = await deleteClass(this.props.classData._id);
        if (response.error)
            return this.handleDeleteClassError(response.error)

        this.setState({ loading: false });

        history.push('/account');
    }

    handleDeleteClassError = (errorResponse) => {
        if (this.errorHasMoreInfo(errorResponse)) {
            this.setState({
                errors: errorResponse.data['errors'],
                loading: false,
            });
            return;
        }
        this.setState({
            errors: 'error deleting class',
            loading: false
        });
    }

    errorHasMoreInfo(errorResponse) {
        return (errorResponse.status === 400 || errorResponse.status === 401) && errorResponse.data['errors'];
    }

    render() {
        const { errors } = this.state;
        return (
            <>
                <Loader show={this.state.loading} />
                <div className='mt-5'>
                    <Button className='w-100 py-3' onClick={this.deleteClass} secondary>Delete</Button>
                    <span className='text-danger d-block mt-2'>{errors['error']}</span>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        classData: state.chef.currentClass,
    }
}

export default connect(mapStateToProps)(DeleteClass);